export const aircraftType = [
      {
        "manufacturer": "Boeing",
        "types": [
          {
            "type": "737",
            "versions": [
                {version: "737-700", 
                 details: {
                    "mtow": 70000,
                    "mtowUnit": "kg",
                    "maxZeroFuelWeight": 58000,
                    "maxZeroFuelWeightUnit": "kg",
                    "bodyType": "narrow",
                    "passengerCapacity": 140,
                    "uldPositions": 6,
                    "landingWeight": 62000,
                    "landingWeightUnit": "kg",
                    "cargoCapacity": 30000,
                    "cargoCapacityUnit": "kg",
                    "maxBulkCapacityWeight": 15000,
                    "maxBulkCapacityWeightUnit": "kg",
                    "maxBulkCapacityVolume": 200,
                    "maxBulkCapacityVolumeUnit": "m3",
                    "maxVolume": 250,
                    "maxVolumeUnit": "m3",
                    "restrictedWeightPerPiece": 200,
                    "restrictedWeightPerPieceUnit": "kg",
                    "maxDimensionPerPieceLength": 2,
                    "maxDimensionPerPieceBreadth": 1.5,
                    "maxDimensionPerPieceHeight": 1.5,
                    "dimensionsUnit": "m",
                    "status": "active",
                    "glCode": "737-700"}}, 
                "737-800", "737-900", "737 MAX 8", "737 MAX 9"]
          },
          {
            "type": "747",
            "versions": ["747-400", "747-8"]
          },
          {
            "type": "757",
            "versions": ["757-200", "757-300"]
          },
          {
            "type": "767",
            "versions": ["767-300ER", "767-400ER"]
          },
          {
            "type": "777",
            "versions": ["777-200", "777-200ER", "777-300", "777-300ER", "777X"]
          },
          {
            "type": "787",
            "versions": ["787-8", "787-9", "787-10"]
          }
        ]
      },
      {
        "manufacturer": "Airbus",
        "types": [
          {
            "type": "A220",
            "versions": ["A220-100", "A220-300"]
          },
          {
            "type": "A320",
            "versions": ["A318", "A319", "A320", "A321", "A320neo", "A321neo"]
          },
          {
            "type": "A330",
            "versions": ["A330-200", "A330-300", "A330-900neo"]
          },
          {
            "type": "A340",
            "versions": ["A340-300", "A340-500", "A340-600"]
          },
          {
            "type": "A350",
            "versions": ["A350-900", "A350-1000"]
          },
          {
            "type": "A380",
            "versions": ["A380-800"]
          }
        ]
      }
    ] as const
  