import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TableComponent from './TableComponent';
import './App.css'




function App() {
  const [a, setA] = useState(<div></div>)
  


  const sendQuery = (query, update) => {
    console.log("Here")
    query = 'http://localhost:3001/api?query=' + query
    console.log(query)

    fetch(query)
       .then((res) => res.json())
       .then((data) => {
          console.log(data.message);
          if (update) {
            setA(<TableComponent data={data.message}/>)
          }
       }).then(console.log("fetched!"))
       .catch((err) => {
          console.log(err.message);
       });
  }

  return (<div>
      <h1>Emma's Super Cool Hotel Conglomerate!</h1>
        <div>
          <button onClick={() => {sendQuery(
            'SELECT * FROM "CityRoom"', true
            )}}>See Rooms By City!</button>
            <button onClick={() => {sendQuery(
            'SELECT * FROM "HotelRooms"', true
            )}}>See Rooms By Hotel!</button>
        </div>
        <h3>Book a Room!</h3>
        <div>
          <label for="cid">Your Customer ID: </label>
          <input type="text" id="cid" name="cid"/>
          <label for="rid">Desired Room ID: </label>
          <input type="text" id="rid" name="rid"/>
          <br/>
          <label for="cidt">Check In Date: </label>
          <input type="text" id="cidt" name="cidt"/>
          <label for="codt">Check Out Date: </label>
          <input type="text" id="codt" name="codt"/>
          <button onClick={() => {
            let msg = ''
            let CID = document.getElementById("cid").value
            let RID = document.getElementById("rid").value
            let CIDT = document.getElementById("cidt").value
            let CODT = document.getElementById("codt").value

            msg = 'INSERT INTO "Booking" SELECT \'' + CIDT + '\', \'' + CODT + '\', (MAX("Booking_ID") %2B 1) FROM "Booking";'
            console.log(msg)
            sendQuery(msg, false)
            msg = 'INSERT INTO "Booked" SELECT \'' + RID + '\',  MAX("Booking_ID") FROM "Booking";'
            console.log(msg)
            sendQuery(msg, false)
            msg = 'INSERT INTO "Creates" SELECT \'' + CID + '\', MAX("Booking_ID") FROM "Booking";'
            console.log(msg)
            sendQuery(msg, false)
          
          }}>Book!</button>
        </div>
        <h3>Refine Search</h3>
        <div>
          <label for="cidt">Check In Date </label>
          <input type="text" id="cidtr" name="cidtr"/>
          <label for="codt">Check Out Date </label>
          <input type="text" id="codtr" name="codtr"/>
          <label for="cap">Capacity </label>
          <input type="text" id="cap" name="cap"/>
          <label for="area">Area </label>
          <input type="text" id="area" name="area"/>
          <label for="chain">Chain </label>
          <input type="text" id="chain" name="chain"/>
          <label for="stars">Stars </label>
          <input type="text" id="stars" name="stars"/>
          <label for="aroom">Rooms Available </label>
          <input type="text" id="aroom" name="aroom"/>
          <label for="price">Price </label>
          <input type="text" id="price" name="price"/>
          <button onClick={() => {
            let msg = 'SELECT * FROM "SearchRoomView" WHERE '
            console.log(document.getElementById("cap").value)
            if (document.getElementById("cap").value != "")  {
              msg += '"Capacity" = ' + document.getElementById("cap").value + " AND "
            }
            if (document.getElementById("area").value != "")  {
              msg += '"Area" = \'' + document.getElementById("area").value + "\' AND "
            }
            if (document.getElementById("chain").value != "")  {
              msg += 'NAME = \'' + document.getElementById("chain").value + "\' AND "
            }
            if (document.getElementById("stars").value != "")  {
              msg += '"Stars" = ' + document.getElementById("stars").value + " AND "
            }
            if (document.getElementById("price").value != "")  {
              msg += '"Price" = ' + document.getElementById("price").value + " AND "
            }
            if (document.getElementById("aroom").value != "")  {
              msg += '"Hotel Rooms" = ' + document.getElementById("aroom").value + " AND "
            }
            msg += 'TRUE'
            console.log(msg)
            sendQuery(
              msg, true
          )}}>Search!</button>
        </div>
      <div>
        <div> 
          {a}
        </div>
      </div>
      <div>
        <h1>Super Secret Employees Only Area</h1>
        <div>
          <h3>Add/Remove Section</h3>
          <div>
            <label >Customer ID (Deleting)</label>
            <input type="text" id="custd" name="sql"/>
            <label >Name (Adding) </label>
            <input type="text" id="named" name="sql"/>
            <button onClick={() => {
              let msg = 'INSERT INTO "Customer" SELECT (MAX("Cust_ID") %2B 1), \'' + document.getElementById("named").value
              + '\', \'Secret\', CURRENT_DATE FROM "Customer" '
              sendQuery(
                msg , false
              )}}>Add Customer</button>
            <button onClick={() => {
              let msg = 'DELETE FROM "Customer" WHERE "Cust_ID" = ' + document.getElementById("custd").value
              sendQuery(
                msg , false
              )}}>Delete Customer</button>
          </div>
          <div>
            <label >Room ID (Deleting)</label>
            <input type="text" id="ridhd" name="ridhd"/>
            <label >Hotel ID (Adding)</label>
            <input type="text" id="hidhd" name="hidid"/>
            <button onClick={() => {
              let msg = 'INSERT INTO "Room" SELECT (MAX("Room_ID") %2B 1), \'Bed\', (MAX("Room_ID") %2B 1) * 3, 3, \'Window\', \'None\''
              + 'FROM "Room"'
              sendQuery(
                msg , false
              )

              msg = 'INSERT INTO "Has" SELECT ' + document.getElementById("hidhd").value 
              + ', (MAX("Room_ID")) FROM "Room"'
              console.log(msg)
              sendQuery(
                msg , false
              )
              }}>Add Room</button>
            <button onClick={() => {
              let msg = 'DELETE FROM "Room" WHERE "Room_ID" = ' + document.getElementById("ridhd").value
              sendQuery(
                msg , false
              )
              msg = 'DELETE FROM "Has" WHERE "Room_ID" = ' + document.getElementById("ridhd").value
              sendQuery(
                msg , false
              )
              
              }}>Delete Room</button>
          </div>
          <div>
            <label >Hotel ID (Deleting)</label>
            <input type="text" id="hidski" name="sql"/>
            <label >Chain ID (Adding)</label>
            <input type="text" id="cidski" name="sql"/>
            <label >Area (Adding)</label>
            <input type="text" id="areaski" name="sql"/>
            <button onClick={() => {
              let msg = 'INSERT INTO "Hotel" SELECT (MAX("Hotel_ID") %2B 1), CONCAT((MAX("Hotel_ID") %2B 1), \' Main Street\'),'
              + 'CONCAT((MAX("Hotel_ID") %2B 1), \'@hotel.com\'), 5555555555, ((MAX("Hotel_ID") %2B 1) % 5) %2B 1, null, \'' +
              document.getElementById("areaski").value  
              + '\' FROM "Hotel"'
              sendQuery(
                msg , false
              )

              msg = 'INSERT INTO "Owns" SELECT \'' + document.getElementById("cidski").value 
              + '\', (MAX("Hotel_ID")) FROM "Hotel"'
              console.log(msg)
              sendQuery(
                msg , false
              )
              }}>Add Hotel</button>

              <button onClick={() => {

              let msg = 'DELETE FROM "Hotel" WHERE "Hotel_ID" = ' + document.getElementById("hidski").value
              sendQuery(
                msg , false
              )
              msg = 'DELETE FROM "Owns" WHERE "Hotel_ID" = ' + document.getElementById("hidski").value
              sendQuery(
                msg , false
              )
              
              }}>Delete Hotel</button>
          </div>
          <div>
            <label >Employee SIN</label>
            <input type="text" id="sinnin" name="sql"/>
            <label >Name (Adding)</label>
            <input type="text" id="namenin" name="sql"/>
            <label >Hotel ID (Adding)</label>
            <input type="text" id="hidnin" name="sql"/>
            <button onClick={() => {
              let msg = 'INSERT INTO "Employee" SELECT  ' +
              document.getElementById("sinnin").value  
              + ', \'' + document.getElementById("namenin").value  + '\'' + ', \'Secret\', \'Manager\''

              console.log(msg)
              sendQuery(
                msg , false
              )

              msg = 'INSERT INTO "Employs" SELECT ' + document.getElementById("hidnin").value 
              + ', ' + document.getElementById("sinnin").value + '  FROM "Hotel"'
              console.log(msg)
              sendQuery(
                msg , false
              )
              }}>Add Employee</button>
            <button onClick={() => {sendQuery(
              document.getElementById("sql").value, false
              )}}>Delete Employee</button>
          </div>
          <h3>Check In a Booking</h3>
          <div>
            <label for="bidb">Booking ID</label>
            <input type="text" id="bidb" name="cidtr"/>
            <label for="priceb">Price</label>
            <input type="text" id="priceb" name="cidtr"/>
            <label for="payb">Payment Info</label>
            <input type="text" id="payb" name="cidtr"/>
            <button onClick={() => {
              
            let msg = 'INSERT INTO "Rents" SELECT "Start_Date", "End_Date", ' + document.getElementById("payb").value
            + ' AS "Card_No", ' + document.getElementById("priceb").value
            + ' AS "Price", "Booking_ID"  FROM "Booking"  WHERE "Booking_ID" = ' + document.getElementById("bidb").value
            console.log(msg)
              sendQuery(
            msg , false
            )}}>Check In!</button>
          </div>
          <h3>Check In a Walk In</h3>
          <div>
            <label for="pricew">Price</label>
            <input type="text" id="pricew" name="cidtr"/>
            <label for="payw">Payment Info</label>
            <input type="text" id="payw" name="cidtr"/>
            <br/>
            <label for="cidtw">Check In Date </label>
            <input type="text" id="cidtw" name="cidtr"/>
            <label for="codtw">Check Out Date </label>
            <input type="text" id="codtw" name="codtr"/>
            <button onClick={() => {
            let msg = 'INSERT INTO "Rents" SELECT \'' + document.getElementById("cidtw").value 
            + '\', \'' + document.getElementById("codtw").value
            + '\', ' + document.getElementById("payw").value
            + ' AS "Card_No", ' + document.getElementById("pricew").value
            + ' AS "Price", null'
            console.log(msg)
              sendQuery(
            msg , false
            )}}>Check In!</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
