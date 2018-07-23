// display username
const welcome = document.getElementById('js-welcome');
const displayName = document.getElementById('js-user');
const displayLetter = document.querySelector('.username-circle p');

const user = JSON.parse(localStorage.getItem('user'));

const greeting = document.createTextNode(`Hello, ${user.firstname}`);
displayName.textContent = user.firstname;
const h2 = document.createElement('h2');
welcome.appendChild(h2);
h2.appendChild(greeting);

// attach first letter of first name
displayLetter.textContent = (
  user.firstname.slice(0, 1)
)
  .toUpperCase() + displayLetter.textContent;

const { id: userId } = JSON.parse(window.localStorage.getItem('user'));
const route = '/api/v1/requests';
const token = localStorage.getItem('token');
const headers = new Headers({
  'x-access-token': token,
});

fetch(route, {
  headers,
  method: 'GET',
})
  .then(res => Promise.all([res.json(), res]))
  .then(([data, res]) => {
    if (!res.ok) {
      // error status handling
      alert(JSON.stringify(data));
    } else {
      const userRequests = data.requests
        .filter(req => req.requester_id === userId);
      const tab = document.getElementById('js-tabs');

      tab.innerHTML = ((dataArr) => {
        const populate = (req, index) => `
          <div class="order-history-tab">
            
        ${index === 0 ? '<div class="order-wrap">' : ''}
        <div class="order-history-header">
          <h3>#${index + 1}</h3>
          <h3>${common.toLocaleDateString({
          date: req.departure_date,
          time: req.departure_time,
        })}</h3>
        </div>
        
        <div>
          <p> &nbsp; Driver: ${req.ride_owner}</p>
        </div>
        
        <div>
            <p> &nbsp; Ride: ${req.city_from} to ${req.city_to}</p>
          </div>
        <div class="order-history-footer">
          <h4>Status:
            <span class="${(() => {
          switch (req.accepted) {
            case false: return 'danger';
            case true: return 'success';
            default: return 'warning';
          }
        })()}">${(() => {
          switch (req.accepted) {
            case false: return 'Rejected';
            case true: return 'Accepted';
            default: return 'Pending';
          }
        })()}</span>
          </h4>
          <h2>&#8358;${req.price.slice(1)}</h2>
          <hr>
          <!-- suffix here (in the last order-history-footer) -->
          ${index === dataArr.length - 1 ? `<a href="user-dashboard.html">
          <button class="btn btn-pri">Back</button></a>` : ''}
        </div>
        <!-- more order-history-tabs here 
        **
        -->
          ${dataArr.length - 1 > index ? populate(dataArr[index + 1], index + 1) : ''}
       </div></div></div>
       <!-- order wrap div occurs once-->
       ${index === 0 ? '</div>' : ''}
          `;
        return populate(dataArr[0], 0);
      })(userRequests);
    }
  })
  .catch(error => common.errorHandler(error));
