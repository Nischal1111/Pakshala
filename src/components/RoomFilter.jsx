import React from 'react'
import "../Css/Rooms.css"

const RoomFilter = () => {
    const allRooms = [
    {
        id: 1,
        category: 'premium',
        name: 'Single Room (Premium)',
        price: 3000,
        bed: 'single',
        guests: 1,
        image: 'url-to-premium-room-image.jpg'
    },
    {
        id: 2,
        category: 'deluxe',
        name: 'Deluxe Room',
        price: 4000,
        bed: 'double',
        guests: 3,
        image: 'url-to-deluxe-room-image.jpg'
    },
    {
        id: 3,
        category: 'luxury',
        name: 'Suite Room (Luxury)',
        price: 5500,
        bed: 'suite',
        guests: 2,
        image: 'url-to-luxury-room-image.jpg'
    }
];

  return (
    <div className='room-filter'>
        <h1>Book a room</h1>
      <div className="filter-choice">
        <button>
            All rooms
        </button>
        <button>
            Premium
        </button>
        <button>
            Deluxe
        </button>
        <button>
            Luxury
        </button>
      </div>
      <div className="room-cards">

      </div>
    </div>
  )
}

export default RoomFilter
