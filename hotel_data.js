const hotels = [
    {
        id: "1",
        name: "Amarela Resort",
        description: "Boutique luxury resort with Balinese-inspired architecture and panoramic ocean views.",
        location: "Punta Nga, Barangay Lourdes, Panglao, Bohol",
        coordinates: { lat: 9.5508, lng: 123.7987 },
        starRating: 4,
        amenities: ["wifi", "pool", "restaurant", "beachfront", "spa", "24-hour-frontdesk"],
        image: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945",
            "https://images.unsplash.com/photo-1578898887764-d5d0aa1d8c6c",
            "https://images.unsplash.com/photo-1582719478181-f94cfcf2e1ca",
            "https://images.unsplash.com/photo-1584467735871-91d0f519b7e5",
            "https://images.unsplash.com/photo-1588577241264-0b4a7c5b86f4"
        ],
        highlights: [
            "Charming Filipino design and heritage décor",
            "Private beach with loungers and hammocks",
            "On-site art gallery and curated local pieces",
            "Quiet, romantic ambiance",
            "Library and reading room"
        ],
        facilities: [
            "Infinity Pool",
            "Beach Access with Loungers",
            "Art Gallery and Library",
            "In-house Restaurant with Local Cuisine",
            "24-hour Front Desk",
            "Airport Transfers"
        ],
        offers: {
            "Food and Drinks": ["Homegrown Filipino Cuisine", "Beachside Dining", "Wine Cellar"],
            "Wellness": ["In-room Massage", "Yoga Deck"],
            "Activities": ["Art Viewing", "Biking", "Sunset Viewing Deck"]
        },
        reviews: [
            {
                rating: 9.4,
                title: "Stunning and Serene",
                author: "Anna P.",
                content: "A peaceful, art-filled getaway. The attention to detail in the design is remarkable.",
                date: "2024-10-11"
            },
            {
                rating: 9.0,
                title: "Romantic Escape",
                author: "Daniel and Rose",
                content: "The perfect place for a couple's retreat. Cozy, quiet, and full of character.",
                date: "2024-12-25"
            },
            {
                rating: 9.2,
                title: "More than just a resort",
                author: "Ella V.",
                content: "It feels like staying in a home filled with history and art. Loved every moment.",
                date: "2025-03-02"
            }
        ],
        rooms: [
            {
                id: "101",
                type: "Beachfront Villa",
                description: "Private villa with direct beach access, outdoor shower, and sunset views",
                price: 12000,
                capacity: 2,
                booked: false,
                image: [
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945",
                    "https://images.unsplash.com/photo-1582719478181-f94cfcf2e1ca",
                    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
                    "https://images.unsplash.com/photo-1588577241264-0b4a7c5b86f4",
                    "https://images.unsplash.com/photo-1551907234-2c5f3972829d"
                ],
                roomfacilities: ["Linens", "WiFi", "Minibar", "Beach View", "Clothes rack", "Telephone"],  
                roomAmenities: ["wifi", "aircon", "minibar", "safe", "bathtub", "terrace"]
            },
            {
                id: "102",
                type: "Garden Suite",
                description: "Spacious suite surrounded by tropical gardens with daybed terrace",
                price: 8500,
                capacity: 2,
                booked: false,
                image: [
                    "https://images.unsplash.com/photo-1566669437685-5f8a3cb53a2a",
                    "https://images.unsplash.com/photo-1584467536037-8e75b6c29e78",
                    "https://images.unsplash.com/photo-1578898887764-d5d0aa1d8c6c",
                    "https://images.unsplash.com/photo-1584467741538-1c12311eebb8",
                    "https://images.unsplash.com/photo-1578894381036-2a63d5021c4c"
                ],
                roomfacilities: ["Linens", "WiFi", "Minibar", "Beach View", "Clothes rack", "Telephone"],
                roomAmenities: ["wifi", "aircon", "coffee-maker", "safe", "balcony"]
            },
            {
                id: "103",
                type: "Family Loft",
                description: "Two-level accommodation with 1 king bed and 2 single beds",
                price: 11000,
                capacity: 4,
                booked: false,
                image: [
                    "https://images.unsplash.com/photo-1591088398332-8a7791972843",
                    "https://images.unsplash.com/photo-1617093727266-6b7f8e9a5bb6",
                    "https://images.unsplash.com/photo-1558002038-1055907df827",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
                    "https://images.unsplash.com/photo-1600488990561-4c1c25c37df1"
                ],
                roomfacilities: ["Linens", "WiFi", "Minibar", "Beach View", "Clothes rack", "Telephone"],
                roomAmenities: ["wifi", "aircon", "minibar", "sofa", "interconnecting"]
            }
        ]
    },
    {
        id: "2",
        name: "Henann Resort Alona Beach",
        description: "Luxurious beachfront resort with multiple swimming pools and vibrant nightlife access.",
        location: "Alona Beach, Panglao, Bohol",
        coordinates:   { "lat": 9.5494, "lng": 123.7658 },  
        starRating: 5,
        amenities: ["wifi", "pool", "restaurant", "beachfront", "spa", "gym", "bar"],
        image: [
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
            "https://images.unsplash.com/photo-1542315192-7d5d9d26f9d9",
            "https://images.unsplash.com/photo-1599423300746-b62533397364",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1560347876-aeef00ee58a1"
        ],
        highlights: [
            "Direct beachfront access",
            "Lagoon-style swimming pools",
            "Nightlife and live entertainment nearby",
            "Wide selection of in-house dining options",
            "Highly rated for location and amenities"
        ],
        facilities: [
            "Multiple Swimming Pools",
            "Fitness Center and Spa",
            "Fine Dining and Buffet Restaurants",
            "Bars and Lounges",
            "Beachfront Loungers",
            "24-hour Reception and Concierge"
        ],
        offers: {
            "Food and Drinks": ["Buffet Breakfast", "Poolside Bar", "Fine Dining Restaurant"],
            "Wellness": ["Full-Service Spa", "Fitness Center", "In-room Massage"],
            "Activities": ["Nightlife Access", "Swimming", "Beach Games"]
        },
        reviews: [
            {
                rating: 9.3,
                title: "Perfect Getaway!",
                author: "Alyssa M.",
                content: "Everything felt luxurious. The pools are amazing and the beach is right there. Highly recommend!",
                date: "2024-11-05"
            },
            {
                rating: 8.8,
                title: "Excellent Stay",
                author: "Tom D.",
                content: "Very spacious rooms and friendly staff. A bit crowded at times but overall great experience.",
                date: "2025-01-18"
            },
            {
                rating: 9.5,
                title: "Presidential Suite Worth Every Peso",
                author: "Janice R.",
                content: "Massive suite with its own jacuzzi and private lounge. Felt like royalty!",
                date: "2025-03-22"
            }
        ],
        rooms: [
            {
                id: "201",
                type: "Premier Pool Access",
                description: "Ground floor room with direct access to lagoon pool",
                price: 9500,
                capacity: 3,
                booked: false,
                image: [
                    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
                    "https://images.unsplash.com/photo-1600585154048-634ddc194ef0",
                    "https://images.unsplash.com/photo-1542315192-7d5d9d26f9d9",
                    "https://images.unsplash.com/photo-1600585153860-3bbedce09889",
                    "https://images.unsplash.com/photo-1599423300746-b62533397364"
                ],
                roomfacilities: ["Pool Access", "Private Terrace", "Modern Bathroom", "Direct Pool Entry"],
                roomAmenities: ["wifi", "aircon", "minibar", "pool-towels", "bathrobes"]
            },
            {
                id: "202",
                type: "Ocean View Deluxe",
                description: "Panoramic sea views with private balcony and sun loungers",
                price: 11000,
                capacity: 2,
                booked: false,
                image: [
                    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
                    "https://images.unsplash.com/photo-1584467735871-91d0f519b7e5",
                    "https://images.unsplash.com/photo-1600585154264-3e75b8e03f6f",
                    "https://images.unsplash.com/photo-1584467387792-7031cb8b3577",
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
                ],
                roomfacilities: ["Balcony with Loungers", "Sea View", "Spacious Bathroom"],
                roomAmenities: ["wifi", "aircon", "minibar", "bathtub", "smart-tv"]
            },
            {
                id: "203",
                type: "Presidential Suite",
                description: "200sqm luxury suite with separate living/dining areas and jacuzzi",
                price: 25000,
                capacity: 4,
                booked: false,
                image: [
                    "https://images.unsplash.com/photo-1564078516393-cf04bd966897",
                    "https://images.unsplash.com/photo-1560347876-aeef00ee58a1",
                    "https://images.unsplash.com/photo-1578894381036-2a63d5021c4c",
                    "https://images.unsplash.com/photo-1558002038-1055907df827",
                    "https://images.unsplash.com/photo-1584467735871-91d0f519b7e5"
                ],
                roomfacilities: ["Jacuzzi", "Private Lounge Area", "Sea View Dining Area", "Dedicated Butler Service"],
                roomAmenities: ["wifi", "aircon", "kitchenette", "jacuzzi", "butler-service"]
            }
        ]
    },
    {
        id: "3",
        name: "Bohol Beach Club",
        description: "Eco-friendly resort on a 1km private white sand beach with excellent snorkeling.",
        location: "Danao, Panglao, Bohol",
        coordinates:   { "lat": 9.5468, "lng": 123.7949 },
        starRating: 4,
        amenities: ["wifi", "pool", "restaurant", "beachfront", "dive-center"],
        image: [ "hotel-images/1boholbeachclubresort.jpg",
                    "hotel-images/1boholbeachclubresort2.jpg",
                    "hotel-images/1boholbeachclubresort3.jpg",
                    "hotel-images/1boholbeachclubresort4.jpg",
                    "hotel-images/1boholbeachclubresort5.jpg",

        ],
        highlights: [
            "Proximity to Alona Beach",
            "Highly Rated Location",
            "Great Food and Dining",
            "Good for Families",
            "Extra Swimming Pool"
        ],
        facilities: [
            "Fitness Center",
            "Swimming Pool and Private Beach",
            "Restaurant",
            "Free Wifi",
            "Front Desk (24 hours)",
            "Foot Bath"
        ],
        offers: {
            "Food and Drinks": ["Room Service (24 Hours)", "Restaurant"],
            "Wellness": ["Fitness center", "Spa"],
            "Activities": ["Pool", "Beach"]
        },
        reviews: [
            {
                rating: 8.2,
                title: "Excellent",
                author: "L. ETF Brown",
                content: "Troughing, time worth anything but a daytime, and appointed and well-measured",
                date: "2023-05-15"
            },
            {
                rating: 9.0,
                title: "Relaxing Paradise",
                author: "Maria Gomez",
                content: "The beach was pristine and the staff were incredibly friendly. Loved the quiet atmosphere.",
                date: "2023-08-10"
            },
            {
                rating: 8.5,
                title: "Perfect for Families",
                author: "Jason Lee",
                content: "Our kids loved the extra pool and the food options were very accommodating.",
                date: "2023-12-05"
            }
        ],
        rooms: [
            {
                id: "301",
                type: "Ocean View Cottage",
                description: "Traditional Filipino cottage with veranda facing the sea",
                price: 7500,
                capacity: 2,
                booked: false,
                image: [
                    "https://images.unsplash.com/photo-1596178065887-1198b6148b2b",
                    "https://images.unsplash.com/photo-1582719478181-f94cfcf2e1ca",
                    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
                    "https://images.unsplash.com/photo-1559599189-257d65ac3b80",
                    "https://images.unsplash.com/photo-1560448075-bb1f6e7d89b5"
                ],
                roomFacilities: ["Private Veranda", "Ocean View", "Outdoor Hammock"],
                roomAmenities: ["wifi", "aircon", "ceiling-fan", "veranda", "hammock"]
            },
            {
                id: "302",
                type: "Beachfront Casita",
                description: "Standalone unit just 10m from the water's edge",
                price: 9000,
                capacity: 2,
                booked: false,
                image: [
                    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
                    "https://images.unsplash.com/photo-1505691723518-36a0f673b1f4",
                    "https://images.unsplash.com/photo-1551776235-dde6d482980f",
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
                    "https://images.unsplash.com/photo-1551888410-9b6c2f57fb1f"
                ],
                roomFacilities: ["Beachfront Access", "Private Daybed", "Outdoor Shower Area"],
                roomAmenities: ["wifi", "aircon", "outdoor-shower", "daybed", "beach-chairs"]
            },
            {
                id: "303",
                type: "Family Beach House",
                description: "Two-bedroom accommodation with kitchenette and dining area",
                price: 15000,
                capacity: 6,
                booked: false,
                image: [
                    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
                    "https://images.unsplash.com/photo-1595520293418-23434989f2c2",
                    "https://images.unsplash.com/photo-1613977258984-26ddedb464a8",
                    "https://images.unsplash.com/photo-1617093727266-6b7f8e9a5bb6",
                    "https://images.unsplash.com/photo-1613977259040-5dbf42b3cebf"
                ],
                roomFacilities: ["Two Bedrooms", "Fully Equipped Kitchenette", "Private Dining Area", "Laundry Space"],
                roomAmenities: ["wifi", "aircon", "kitchenette", "dining-area", "laundry"]
            }
        ]
    },
    {
        id: "4",
        name: "South Palms Resort",
        description: "Upscale resort with 800m of private beach and stunning palm tree-lined shores.",
        location: "Danao, Panglao, Bohol",
        coordinates:    { "lat": 9.5460, "lng": 123.7994 },
        starRating: 4,
        amenities: ["wifi", "pool", "restaurant", "beachfront", "watersports", "tennis-court"],
        images: [
            "hotel_images/1boholbeachclubresort.jpg",
            "hotel_images/1boholbeachclubresort2.jpg",
            "hotel_images/1boholbeachclubresort3.jpg",
            "hotel_images/1boholbeachclubresort4.jpg",
            "hotel_images/1boholbeachclubresort5.jpg"
        ],
        highlights: [
            "Private 800m white sand beach",
            "Stunning palm-lined shorefront",
            "Luxurious beachfront villas",
            "Romantic ocean view suites",
            "Award-winning tropical gardens"
        ],
        facilities: [
            "Infinity Pool",
            "Private Beachfront Area",
            "On-site Restaurant",
            "Fitness Center",
            "Spa and Wellness Services",
            "24-hour Front Desk"
        ],
        offers: {
            "Food and Drinks": ["All-day Dining", "Beach Bar", "Room Service"],
            "Wellness": ["Spa Services", "Yoga by the Beach"],
            "Activities": ["Snorkeling", "Tennis Court", "Watersports Rentals"]
        },
        reviews: [
            {
                rating: 9.3,
                title: "Truly Paradise",
                author: "Anna Rivera",
                content: "The resort is quiet and peaceful. Our beachfront villa was incredible. Will definitely come back!",
                date: "2024-07-18"
            },
            {
                rating: 8.9,
                title: "Tropical Luxury",
                author: "Daniel Cruz",
                content: "Service was top-notch. Loved the palm trees everywhere and relaxing by the private beach.",
                date: "2024-09-01"
            },
            {
                rating: 9.1,
                title: "Unforgettable Stay",
                author: "Ella R.",
                content: "It felt like a dream. Perfect honeymoon destination. The food and beach were exceptional.",
                date: "2025-01-22"
            }
        ],
        rooms: [
            {
                id: "401",
                type: "Palm View Suite",
                description: "Second floor suite overlooking the iconic palm tree allee",
                price: 8200,
                capacity: 2,
                booked: false,
                image: [
                    "https://images.unsplash.com/photo-1595518321836-2d1a3a0e9825",
                    "https://images.unsplash.com/photo-1582719478181-f94cfcf2e1ca",
                    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
                    "https://images.unsplash.com/photo-1559599189-257d65ac3b80",
                    "https://images.unsplash.com/photo-1560448075-bb1f6e7d89b5"
                ],
                roomFacilities: ["Private Balcony", "Palm Tree View", "Work Area"],
                roomAmenities: ["wifi", "aircon", "coffee-maker", "balcony", "work-desk"]
            },
            {
                id: "402",
                type: "Beachfront Villa",
                description: "Private villa with direct beach access and outdoor jacuzzi",
                price: 15000,
                capacity: 2,
                booked: false,
                image: [
                    "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
                    "https://images.unsplash.com/photo-1505691723518-36a0f673b1f4",
                    "https://images.unsplash.com/photo-1551776235-dde6d482980f",
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
                    "https://images.unsplash.com/photo-1551888410-9b6c2f57fb1f"
                ],
                roomFacilities: ["Direct Beach Access", "Outdoor Jacuzzi", "Private Pool", "Butler Service"],
                roomAmenities: ["wifi", "aircon", "jacuzzi", "private-pool", "butler"]
            },
            {
                id: "403",
                type: "Ocean Pavilion",
                description: "Luxury tented accommodation with panoramic ocean views",
                price: 18000,
                capacity: 2,
                booked: false,
                image: [
                    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
                    "https://images.unsplash.com/photo-1617093727266-6b7f8e9a5bb6",
                    "https://images.unsplash.com/photo-1613977259040-5dbf42b3cebf",
                    "https://images.unsplash.com/photo-1613977258984-26ddedb464a8",
                    "https://images.unsplash.com/photo-1595520293418-23434989f2c2"
                ],
                roomFacilities: ["Panoramic Ocean View", "Tented Glamping Style", "Outdoor Deck"],
                roomAmenities: ["wifi", "aircon", "bathtub", "outdoor-deck", "minibar"]
            }
        ]
    },
    {
        id: "5",
        name: "Alona Vida Beach Resort",
        description: "Charming mid-range resort right on Alona Beach with excellent service.",
        location: "Alona Beach, Panglao, Bohol",
        coordinates:  { "lat": 9.5499, "lng": 123.7656 },
        starRating: 3,
        amenities: ["wifi", "pool", "restaurant", "beachfront"],
        image: [
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
            "https://images.unsplash.com/photo-1526073654229-b16fa9eb0c3b",
            "https://images.unsplash.com/photo-1567431290-72b8538f3017",
            "https://images.unsplash.com/photo-1532006473-2805b43651b2",
            "https://images.unsplash.com/photo-1541466698-33b4f1771f6a"
        ],
        highlights: [
            "Located on vibrant Alona Beach",
            "Live music and beachfront dining",
            "Friendly staff and great service",
            "Popular among backpackers and divers",
            "Walking distance to nightlife"
        ],
        facilities: [
            "Outdoor Pool",
            "Beachfront Restaurant",
            "Bar with Live Music",
            "Luggage Storage",
            "24-hour Security",
            "Shuttle Service (Extra Fee)"
        ],
        offers: {
            "Food and Drinks": ["Cocktail Bar", "All-Day Dining"],
            "Wellness": ["Massage Services"],
            "Activities": ["Beach Volleyball", "Island Hopping Tours"]
        },
        reviews: [
            {
                rating: 8.0,
                title: "Great Location",
                author: "Sam R.",
                content: "You can literally walk out onto the beach. Bars, food, music — it’s all nearby.",
                date: "2024-06-12"
            },
            {
                rating: 7.8,
                title: "Budget Friendly & Fun",
                author: "Keira D.",
                content: "Not super fancy, but clean, comfortable, and very convenient!",
                date: "2024-09-28"
            },
            {
                rating: 8.5,
                title: "Perfect for Divers",
                author: "Markus W.",
                content: "Dive center nearby, and the staff were helpful with arranging boat tours.",
                date: "2025-01-03"
            }
        ],
        rooms: [
            {
                id: "501",
                type: "Deluxe Beachfront",
                description: "Modern room just steps from the white sand beach",
                price: 5500,
                capacity: 2,
                booked: false,
                image: [
                    "https://images.unsplash.com/photo-1591088398332-8a7791972843",
                    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
                    "https://images.unsplash.com/photo-1551888410-9b6c2f57fb1f",
                    "https://images.unsplash.com/photo-1582719478181-f94cfcf2e1ca",
                    "https://images.unsplash.com/photo-1559599189-257d65ac3b80"
                ],
                roomFacilities: ["Beach Access", "Private Balcony", "Secure Safe Box"],
                roomAmenities: ["wifi", "aircon", "tv", "balcony", "safe"]
            },
            {
                id: "502",
                type: "Garden Room",
                description: "Quiet room surrounded by tropical plants",
                price: 4500,
                capacity: 2,
                booked: false,
                image: [
                    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
                    "https://images.unsplash.com/photo-1560448075-bb1f6e7d89b5",
                    "https://images.unsplash.com/photo-1582719478181-f94cfcf2e1ca",
                    "https://images.unsplash.com/photo-1613977258984-26ddedb464a8",
                    "https://images.unsplash.com/photo-1617093727266-6b7f8e9a5bb6"
                ],
                roomFacilities: ["Garden View", "Private Terrace", "Peaceful Environment"],
                roomAmenities: ["wifi", "aircon", "tv", "terrace"]
            },
            {
                id: "503",
                type: "Family Room",
                description: "Interconnecting rooms perfect for families",
                price: 8000,
                capacity: 4,
                booked: false,
                image: [
                    "https://images.unsplash.com/photo-1566669437685-5f8a3cb53a2a",
                    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
                    "https://images.unsplash.com/photo-1613977259040-5dbf42b3cebf",
                    "https://images.unsplash.com/photo-1505691723518-36a0f673b1f4",
                    "https://images.unsplash.com/photo-1613977258984-26ddedb464a8"
                ],
                roomFacilities: ["Interconnecting Doors", "Extra Seating", "Spacious Layout"],
                roomAmenities: ["wifi", "aircon", "tv", "interconnecting", "sofa"]
            }
        ]
    },
    {
        id: "6",
        name: "Panglao Nature Resort",                  
        description: "Tranquil eco-resort with lush tropical gardens and natural swimming pool.",
        location: "Tawala, Panglao, Bohol",
        coordinates:   { "lat": 9.5475, "lng": 123.7780 },
        starRating: 3,
        amenities: ["wifi", "pool", "restaurant", "garden", "spa"],
        image: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        "https://images.unsplash.com/photo-1564624807-bb7b7f21e551",
        "https://images.unsplash.com/photo-1570196406143-c3e436fdf9f3",
        "https://images.unsplash.com/photo-1591460424207-73b8cf4679b1",
        "https://images.unsplash.com/photo-1586333499735-d8e88869411a"
    ],
        highlights: [
            "Eco-friendly resort surrounded by lush nature",
            "Natural swimming pool fed by spring water",
            "Relaxing spa and wellness services",
            "Quiet and peaceful location",
            "Organic restaurant serving fresh local cuisine"
        ],
        facilities: [
            "Natural Spring Pool",
            "Organic Garden-to-Table Restaurant",
            "Eco Spa and Wellness Center",
            "Yoga Pavilion",
            "Library and Meditation Room",
            "Airport Transfers (on request)"
        ],
        offers: {
            "Food and Drinks": ["Vegetarian Cuisine", "Fresh Juices", "Local Dishes"],
            "Wellness": ["Spa Treatments", "Yoga Classes", "Nature Walks"],
            "Activities": ["Bird Watching", "Island Hopping", "Biking Trails"]
        },
        reviews: [
            {
                rating: 8.7,
                title: "Peaceful and Relaxing",
                author: "Lena H.",
                content: "I loved the nature vibes and the peaceful atmosphere. Perfect for a digital detox.",
                date: "2024-07-05"
            },
            {
                rating: 8.3,
                title: "Natural Beauty Everywhere",
                author: "Carlos M.",
                content: "You wake up to birdsong and greenery. Pool is so clean and refreshing!",
                date: "2024-10-12"
            },
            {
                rating: 9.0,
                title: "Ideal for Yoga Retreat",
                author: "Priya T.",
                content: "The yoga deck is stunning. Their spa treatments are a must-try.",
                date: "2025-02-01"
            }
        ],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        rooms: [
            {
                id: "601",
                type: "Garden Bungalow",
                description: "Freestanding cottage surrounded by tropical foliage",
                price: 4800,
                capacity: 2,
                booked: false,
                image: [
                    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
                    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
                    "https://images.unsplash.com/photo-1551888410-9b6c2f57fb1f",
                    "https://images.unsplash.com/photo-1617093727266-6b7f8e9a5bb6",
                    "https://images.unsplash.com/photo-1582719478181-f94cfcf2e1ca"
                ],
                roomFacilities: ["Private Veranda", "Garden Hammock", "Eco-Friendly"],
                roomAmenities: ["wifi", "aircon", "veranda", "hammock", "ceiling-fan"]
            },
            {
                id: "602",
                type: "Poolside Room",
                description: "Contemporary room with direct access to natural pool",
                price: 5200,
                capacity: 2,
                booked: false,
                image: [
                    "https://images.unsplash.com/photo-1596178065887-1198b6148b2b",
                    "https://images.unsplash.com/photo-1613977258984-26ddedb464a8",
                    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
                    "https://images.unsplash.com/photo-1600585153689-840d9d87a1b4",
                    "https://images.unsplash.com/photo-1559599189-257d65ac3b80"
                ],
                roomFacilities: ["Pool Access", "Outdoor Lounge", "Daybed Comfort"],
                roomAmenities: ["wifi", "aircon", "pool-access", "daybed", "safe"]
            },
            {
                id: "603",
                type: "Nature Suite",
                description: "Spacious suite with outdoor rain shower and garden view",
                price: 6500,
                capacity: 3,
                booked: false,
                image: [
                    "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
                    "https://images.unsplash.com/photo-1613977259040-5dbf42b3cebf",
                    "https://images.unsplash.com/photo-1505691723518-36a0f673b1f4",
                    "https://images.unsplash.com/photo-1559599238-cdba0f7db0aa",
                    "https://images.unsplash.com/photo-1566669437685-5f8a3cb53a2a"
                ],
                roomFacilities: ["Outdoor Rain Shower", "Garden View", "Work Corner"],
                roomAmenities: ["wifi", "aircon", "outdoor-shower", "sofa", "work-desk"]
            }
        ]
    }
];


function getAvailableRooms() {
    return hotels.flatMap(hotel =>  
        hotel.rooms
            .filter(room => !room.booked)
            .map(room => ({
                ...room,
                hotelName: hotel.name,
                hotelId: hotel.id,
                hotelRating: hotel.starRating,
                hotelAmenities: hotel.amenities,
                hotelImage: hotel.image
            }))
    );
}

function getHotelsWithAvailability() {
    return hotels.filter(hotel => 
        hotel.rooms.some(room => !room.booked)
    );
}

function getAvailableRoomsInHotel(hotelId) {
    const hotel = hotels.find(h => h.id === hotelId);
    if (!hotel) return [];
    return hotel.rooms.filter(room => !room.booked);
}