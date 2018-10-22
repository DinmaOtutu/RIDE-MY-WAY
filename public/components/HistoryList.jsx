import React from 'react';


const HistoryList = () => (
  <div className="main-wrapper" id="has-modal">
    <div className="order-history">
      <div className="page-heading">
        <h2 className="order-wraps"> Ride History</h2>
        <hr />
      </div>
      <div className="tabs" id="js-tabs">
        <div className="order-history-tab">

          <div className="order-wrap">
            <div className="order-history-header">
              <h3>#001</h3>
              <h3>12/06/18 12:38pm</h3>
            </div>

            <div>
              <p>&nbsp;Ms Iloeje</p>
            </div>

            <div>
              <p>&nbsp; Ride: Ikeja to Oshodi</p>
            </div>
            <div className="order-history-footer">
              <h4>Status:
                <span className="success">Accepted</span>
              </h4>

              <hr />

            </div>

            <div className="order-wrap">
              <div className="order-history-header">
                <h3>#002</h3>
                <h3>12/06/18 12:38pm</h3>
              </div>

              <div>
                <p>&nbsp;Ms Iloeje</p>
              </div>

              <div>
                <p>&nbsp; Ride: Ikeja to Oshodi</p>
              </div>
              <div className="order-history-footer">
                <h4>Status:
                  <span className="success">Accepted</span>
                </h4>

                <hr />

              </div>

              <div className="order-wrap">
                <div className="order-history-header">
                  <h3>#003</h3>
                  <h3>12/06/18 12:38pm</h3>
                </div>

                <div>
                  <p>&nbsp;Ms Iloeje</p>
                </div>

                <div>
                  <p>&nbsp; Ride: Ikeja to Oshodi</p>
                </div>
                <div className="order-history-footer">
                  <h4>Status:
                    <span className="success">Accepted</span>
                  </h4>

                  <hr />

                </div>

                <a href="user-dashboard.html">
                  <button className="btn btn-pri">Back</button>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
);

export default HistoryList;
