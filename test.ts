// DevHub Service
 
// This is data returned by the DevHub service
interface DevHubEntity {
    kind: string,   // eg: service, database, queue
    id: string,     // can be any alphanumeric value
    data: {
        owner: string,    // eg: dev-portal-squad
        tier?: number,    // eg: 1,2,3,4
        engine?: string,  
        displayName: string,  // eg: "test service"
    }
  }
   
  interface UpdatesPage {
    next?: string,
    newEntities: DevHubEntity[],
    removedEntities: string[]
  }
   
  /**
   * use DevHub service to fetch the list of entities that are updated from a given date time
   * list of entities is paginated, use the cursor `next` to ask for the next page
   * `null` value is returned when there are no more pages to fetch
   */
  interface DevHubService {
    fetchUpdatesFromTime(fromTime: Date, next?: string): Promise<UpdatesPage | null>
  }
   
  /*--------------------------------------------------------------------------------------*/
   
  // Developer Portal
   
  // This is the data shown in the portal
  interface ServicePortalData {
    id: string,
    spec: {
        owner: string
        displayName: string,
        tier: number
    }
  }
   
  /*--------------------------------------------------------------------------------------*/
   
  type CronEventHandler = (now: Date) => Promise<boolean>
   
  interface MyCache {
    get(key: string): Promise<string | undefined>
    set(key: string, value: string): Promise<void>
  }
   
  // IMPLEMENT AND TEST THIS
  const cacheEventHandler = (myCache: MyCache, devHubService: DevHubService): CronEventHandler => async (now) => {
    try {
        // TODO
    /* 
    * reads data from a DevHub service 
    * transforms it into a developer portal data format
    * set data into the cache
    */

   let morePages = true
   
   let next:string | undefined = '';
   while(morePages) {

    const updatesPage = await devHubService.fetchUpdatesFromTime(now, next)
    if(!updatesPage) {
        morePages = false;
        break;
    }
    const {newEntities, removedEntities, next: nextCursor} = updatesPage
    for (const entity of newEntities) {
        if(entity.kind === 'service' && entity.data.tier !== undefined ) {
            const transformed: ServicePortalData = {
                id: entity.id,
                spec: {
                    owner: entity.data.owner,
                    displayName: entity.data.displayName,
                    tier: entity.data.tier
                }
            };
    await myCache.set(`service-${entity.id}`, JSON.stringify(transformed))
        }
    }
    for (const removedId of removedEntities) {
        await myCache.set(`service-${removedId}`, '')
    }

}
return true;

} catch (error) {
    console.log(error)
    return false
}
  }

describe('cacheEventHandler', () => {
    let mockCache: MyCache;
    let mockDevHubService: DevHubService;
    let handler: CronEventHandler;

    beforeEach(() => {
        mockCache = {
            get: jest.fn(),
            set: jest.fn(),
        }

        mockDevHubService = {
            fetchUpdatesFromTime: jest.fn() 
        }
        handler = cacheEventHandler(mockCache, mockDevHubService)
    })

    test('should fetch updates and cache transformed data', async () => {
        (mockDevHubService.fetchUpdatesFromTime as jest.mock).mockResolvedValueOne({
            next: null,
            newEntities: [
                {
                    kind: 'service',
                    id: '123',
                    data: {
                       owner: 'dev-group',
                       tier: 1,
                       displayName: 'Test service'
                    }
                }
           
            ],
            removedEntities: []
        })
    })
})
