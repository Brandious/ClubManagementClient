import React from 'react'

function Todo() {
    return (
        <div>
             <h1 style={{textAlign: 'center'}}>Diamond Staff and Management Structure</h1>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-around'}}>
        
        <ul>
                <li>
                    Autentikacija i Autorizacija
                </li>
            </ul>
            <div style={{borderLeft: '6px solid black', height: '500px'}}></div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
           
            <h3>Staff</h3>
            <ul style={{textAlign: 'left'}}>
              <li>Prodati Kartu</li>
              <li>Napraviti Rezervaciju</li>
              <li>Popisati Sank</li>
              <li>Zatraziti Narudzbu iz skladista</li>
              <li>Popis Zauzetih Stolova</li>
              <li>Unijeti Skladiste</li>
            </ul>
          </div>
          <div style={{borderLeft: '6px solid black', height: '500px'}}></div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <h3>Management</h3>
            <ul style={{textAlign: 'left'}}>
              <li>Prodati Kartu</li>
              <li>Kreirati Event</li>
              <li>Kreirati Pakete</li>
              <li>Napraviti Rezervaciju</li>
              <li>Provjeriti Inverture Sankova</li>
              <li>Napraviti Rezervaciju</li>
              <li>Izvuci Narudzbe Skladista</li>
              <li>Izvuci Prodane Karte</li>
              <li>Statistika Rezervacija</li>
              <li>Statistika Skladista</li>
              <li>QR Menu
                  <ul>
                      <li>Kreiraj QR Menu</li>
                      <li>Edituj QR Menu</li>
                      <li>Izbrisi QR Menu</li>
                  </ul>
              </li>
            </ul>
          </div>
        </div>
    </div>
    )
}

export default Todo
