export default [
  {
    program_id   : 0,
    crust_id     : 0,
    program_name : "Russian Cook",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Mix",
        temp       : 30,
        motor      : "onoff",
        duration   : 120
      },
      {
        stage_name : "1st Knead",
        temp       : 30,
        motor      : "on",
        duration   : 300
      },
      {
        stage_name : "Rest",
        temp       : 30,
        motor      : "off",
        duration   : 300
      },
      {
        stage_name : "2nd Knead",
        temp       : 30,
        motor      : "on",
        duration   : 720
      },
      {
        stage_name : "1st Rise",
        temp       : 36,
        motor      : "off",
        duration   : 2400
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "2nd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 1560
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "3rd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 3600
      },
      {
        stage_name : "Bake",
        temp       : 110,
        motor      : "off",
        duration   : 3000
      },
      {
        stage_name : "Cool",
        temp       : 50,
        motor      : "off",
        duration   : 1200
      }
    ],
    beeps : [
      {
        stage : 3,
        time  : 180,
        count : 8
      }
    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 0,
    crust_id     : 1,
    program_name : "Russian Cook (light)",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Mix",
        temp       : 30,
        motor      : "onoff",
        duration   : 120
      },
      {
        stage_name : "1st Knead",
        temp       : 30,
        motor      : "on",
        duration   : 300
      },
      {
        stage_name : "Rest",
        temp       : 30,
        motor      : "off",
        duration   : 300
      },
      {
        stage_name : "2nd Knead",
        temp       : 30,
        motor      : "on",
        duration   : 720
      },
      {
        stage_name : "1st Rise",
        temp       : 36,
        motor      : "off",
        duration   : 2400
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "2nd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 1560
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "3rd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 3600
      },
      {
        stage_name : "Bake",
        temp       : 110,
        motor      : "off",
        duration   : 3000
      },
      {
        stage_name : "Cool",
        temp       : 50,
        motor      : "off",
        duration   : 1200
      }
    ],
    beeps : [
      {
        stage : 3,
        time  : 180,
        count : 8
      }
    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 0,
    crust_id     : 2,
    program_name : "Russian Cook (dark)",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Mix",
        temp       : 30,
        motor      : "onoff",
        duration   : 120
      },
      {
        stage_name : "1st Knead",
        temp       : 30,
        motor      : "on",
        duration   : 300
      },
      {
        stage_name : "Rest",
        temp       : 30,
        motor      : "off",
        duration   : 300
      },
      {
        stage_name : "2nd Knead",
        temp       : 30,
        motor      : "on",
        duration   : 720
      },
      {
        stage_name : "1st Rise",
        temp       : 36,
        motor      : "off",
        duration   : 2400
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "2nd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 1560
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "3rd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 3600
      },
      {
        stage_name : "Bake",
        temp       : 120,
        motor      : "off",
        duration   : 3000
      },
      {
        stage_name : "Cool",
        temp       : 50,
        motor      : "off",
        duration   : 1200
      }
    ],
    beeps : [
      {
        stage : 3,
        time  : 180,
        count : 8
      }
    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 1,
    crust_id     : 0,
    program_name : "Basic Bread",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Mix",
        temp       : 30,
        motor      : "onoff",
        duration   : 120
      },
      {
        stage_name : "1st Knead",
        temp       : 30,
        motor      : "on",
        duration   : 300
      },
      {
        stage_name : "Rest",
        temp       : 30,
        motor      : "off",
        duration   : 300
      },
      {
        stage_name : "2nd Knead",
        temp       : 30,
        motor      : "on",
        duration   : 720
      },
      {
        stage_name : "1st Rise",
        temp       : 36,
        motor      : "off",
        duration   : 2400
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "2nd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 1560
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "3rd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 3600
      },
      {
        stage_name : "Bake",
        temp       : 110,
        motor      : "off",
        duration   : 3000
      },
      {
        stage_name : "Cool",
        temp       : 50,
        motor      : "off",
        duration   : 1200
      }
    ],
    beeps : [
      {
        stage : 3,
        time  : 180,
        count : 8
      }
    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 1,
    crust_id     : 1,
    program_name : "Basic Bread (light)",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Mix",
        temp       : 30,
        motor      : "onoff",
        duration   : 120
      },
      {
        stage_name : "1st Knead",
        temp       : 30,
        motor      : "on",
        duration   : 300
      },
      {
        stage_name : "Rest",
        temp       : 30,
        motor      : "off",
        duration   : 300
      },
      {
        stage_name : "2nd Knead",
        temp       : 30,
        motor      : "on",
        duration   : 720
      },
      {
        stage_name : "1st Rise",
        temp       : 36,
        motor      : "off",
        duration   : 2400
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "2nd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 1560
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "3rd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 3600
      },
      {
        stage_name : "Bake",
        temp       : 100,
        motor      : "off",
        duration   : 3000
      },
      {
        stage_name : "Cool",
        temp       : 50,
        motor      : "off",
        duration   : 1200
      }
    ],
    beeps : [
      {
        stage : 3,
        time  : 180,
        count : 8
      }
    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 1,
    crust_id     : 2,
    program_name : "Basic Bread (dark)",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Mix",
        temp       : 30,
        motor      : "onoff",
        duration   : 120
      },
      {
        stage_name : "1st Knead",
        temp       : 30,
        motor      : "on",
        duration   : 300
      },
      {
        stage_name : "Rest",
        temp       : 30,
        motor      : "off",
        duration   : 300
      },
      {
        stage_name : "2nd Knead",
        temp       : 30,
        motor      : "on",
        duration   : 720
      },
      {
        stage_name : "1st Rise",
        temp       : 36,
        motor      : "off",
        duration   : 2400
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "2nd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 1560
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "3rd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 3600
      },
      {
        stage_name : "Bake",
        temp       : 120,
        motor      : "off",
        duration   : 3000
      },
      {
        stage_name : "Cool",
        temp       : 50,
        motor      : "off",
        duration   : 1200
      }
    ],
    beeps : [
      {
        stage : 3,
        time  : 180,
        count : 8
      }
    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 2,
    crust_id     : 0,
    program_name : "Specialty Bread",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Mix",
        temp       : 30,
        motor      : "onoff",
        duration   : 120
      },
      {
        stage_name : "1st Knead",
        temp       : 30,
        motor      : "on",
        duration   : 300
      },
      {
        stage_name : "Rest",
        temp       : 30,
        motor      : "off",
        duration   : 300
      },
      {
        stage_name : "2nd Knead",
        temp       : 30,
        motor      : "on",
        duration   : 720
      },
      {
        stage_name : "1st Rise",
        temp       : 36,
        motor      : "off",
        duration   : 2400
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "2nd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 1560
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "3rd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 3600
      },
      {
        stage_name : "Bake",
        temp       : 110,
        motor      : "off",
        duration   : 3000
      },
      {
        stage_name : "Cool",
        temp       : 50,
        motor      : "off",
        duration   : 1200
      }
    ],
    beeps : [
      {
        stage : 3,
        time  : 180,
        count : 8
      }
    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 2,
    crust_id     : 1,
    program_name : "Specialty Bread (light)",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Mix",
        temp       : 30,
        motor      : "onoff",
        duration   : 120
      },
      {
        stage_name : "1st Knead",
        temp       : 30,
        motor      : "on",
        duration   : 300
      },
      {
        stage_name : "Rest",
        temp       : 30,
        motor      : "off",
        duration   : 300
      },
      {
        stage_name : "2nd Knead",
        temp       : 30,
        motor      : "on",
        duration   : 720
      },
      {
        stage_name : "1st Rise",
        temp       : 36,
        motor      : "off",
        duration   : 2400
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "2nd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 1560
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "3rd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 3600
      },
      {
        stage_name : "Bake",
        temp       : 100,
        motor      : "off",
        duration   : 3000
      },
      {
        stage_name : "Cool",
        temp       : 50,
        motor      : "off",
        duration   : 1200
      }
    ],
    beeps : [
      {
        stage : 3,
        time  : 180,
        count : 8
      }
    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 2,
    crust_id     : 2,
    program_name : "Specialty Bread (dark)",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Mix",
        temp       : 30,
        motor      : "onoff",
        duration   : 120
      },
      {
        stage_name : "1st Knead",
        temp       : 30,
        motor      : "on",
        duration   : 300
      },
      {
        stage_name : "Rest",
        temp       : 30,
        motor      : "off",
        duration   : 300
      },
      {
        stage_name : "2nd Knead",
        temp       : 30,
        motor      : "on",
        duration   : 720
      },
      {
        stage_name : "1st Rise",
        temp       : 36,
        motor      : "off",
        duration   : 2400
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "2nd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 1560
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "3rd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 3600
      },
      {
        stage_name : "Bake",
        temp       : 120,
        motor      : "off",
        duration   : 3000
      },
      {
        stage_name : "Cool",
        temp       : 50,
        motor      : "off",
        duration   : 1200
      }
    ],
    beeps : [
      {
        stage : 3,
        time  : 180,
        count : 8
      }
    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 3,
    crust_id     : 0,
    program_name : "French Bread",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Pre Heat",
        temp       : 30,
        motor      : "off",
        duration   : 1200
      },
      {
        stage_name : "Mix",
        temp       : 30,
        motor      : "onoff",
        duration   : 120
      },
      {
        stage_name : "1st Knead",
        temp       : 30,
        motor      : "on",
        duration   : 660
      },
      {
        stage_name : "Rest",
        temp       : 30,
        motor      : "off",
        duration   : 3000
      },
      {
        stage_name : "2nd Knead",
        temp       : 30,
        motor      : "on",
        duration   : 720
      },
      {
        stage_name : "1st Rise",
        temp       : 36,
        motor      : "off",
        duration   : 1200
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "2nd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 900
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "3nd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 2400
      },
      {
        stage_name : "Bake",
        temp       : 110,
        motor      : "off",
        duration   : 3000
      },
      {
        stage_name : "Cool",
        temp       : 50,
        motor      : "off",
        duration   : 1200
      }
    ],
    beeps : [
      {
        stage : 4,
        time  : 180,
        count : 8
      }
    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 3,
    crust_id     : 1,
    program_name : "French Bread (light)",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Pre Heat",
        temp       : 30,
        motor      : "off",
        duration   : 1200
      },
      {
        stage_name : "Mix",
        temp       : 30,
        motor      : "onoff",
        duration   : 120
      },
      {
        stage_name : "1st Knead",
        temp       : 30,
        motor      : "on",
        duration   : 660
      },
      {
        stage_name : "Rest",
        temp       : 30,
        motor      : "off",
        duration   : 3000
      },
      {
        stage_name : "2nd Knead",
        temp       : 30,
        motor      : "on",
        duration   : 720
      },
      {
        stage_name : "1st Rise",
        temp       : 36,
        motor      : "off",
        duration   : 1200
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "2nd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 900
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "3nd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 2400
      },
      {
        stage_name : "Bake",
        temp       : 100,
        motor      : "off",
        duration   : 3000
      },
      {
        stage_name : "Cool",
        temp       : 50,
        motor      : "off",
        duration   : 1200
      }
    ],
    beeps : [
      {
        stage : 4,
        time  : 180,
        count : 8
      }
    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 3,
    crust_id     : 2,
    program_name : "French Bread (dark)",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Pre Heat",
        temp       : 30,
        motor      : "off",
        duration   : 1200
      },
      {
        stage_name : "Mix",
        temp       : 30,
        motor      : "onoff",
        duration   : 120
      },
      {
        stage_name : "1st Knead",
        temp       : 30,
        motor      : "on",
        duration   : 660
      },
      {
        stage_name : "Rest",
        temp       : 30,
        motor      : "off",
        duration   : 3000
      },
      {
        stage_name : "2nd Knead",
        temp       : 30,
        motor      : "on",
        duration   : 720
      },
      {
        stage_name : "1st Rise",
        temp       : 36,
        motor      : "off",
        duration   : 1200
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "2nd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 900
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "3nd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 2400
      },
      {
        stage_name : "Bake",
        temp       : 120,
        motor      : "off",
        duration   : 3000
      },
      {
        stage_name : "Cool",
        temp       : 50,
        motor      : "off",
        duration   : 1200
      }
    ],
    beeps : [
      {
        stage : 4,
        time  : 180,
        count : 8
      }
    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 4,
    crust_id     : 0,
    program_name : "Rapid Bread",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Mix",
        temp       : 30,
        motor      : "onoff",
        duration   : 120
      },
      {
        stage_name : "1st Knead",
        temp       : 30,
        motor      : "on",
        duration   : 300
      },
      {
        stage_name : "Rest",
        temp       : 30,
        motor      : "off",
        duration   : 300
      },
      {
        stage_name : "2nd Knead",
        temp       : 30,
        motor      : "on",
        duration   : 420
      },
      {
        stage_name : "1st Rise",
        temp       : 36,
        motor      : "off",
        duration   : 780
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "2nd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 3120
      },
      {
        stage_name : "Bake",
        temp       : 110,
        motor      : "off",
        duration   : 2100
      }
    ],
    beeps : [
      {
        stage : 3,
        time  : 120,
        count : 8
      }
    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 4,
    crust_id     : 1,
    program_name : "Rapid Bread (light)",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Mix",
        temp       : 30,
        motor      : "onoff",
        duration   : 120
      },
      {
        stage_name : "1st Knead",
        temp       : 30,
        motor      : "on",
        duration   : 300
      },
      {
        stage_name : "Rest",
        temp       : 30,
        motor      : "off",
        duration   : 300
      },
      {
        stage_name : "2nd Knead",
        temp       : 30,
        motor      : "on",
        duration   : 420
      },
      {
        stage_name : "1st Rise",
        temp       : 36,
        motor      : "off",
        duration   : 780
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "2nd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 3120
      },
      {
        stage_name : "Bake",
        temp       : 100,
        motor      : "off",
        duration   : 2100
      }
    ],
    beeps : [
      {
        stage : 3,
        time  : 120,
        count : 8
      }
    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 4,
    crust_id     : 2,
    program_name : "Rapid Bread (dark)",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Mix",
        temp       : 30,
        motor      : "onoff",
        duration   : 120
      },
      {
        stage_name : "1st Knead",
        temp       : 30,
        motor      : "on",
        duration   : 300
      },
      {
        stage_name : "Rest",
        temp       : 30,
        motor      : "off",
        duration   : 300
      },
      {
        stage_name : "2nd Knead",
        temp       : 30,
        motor      : "on",
        duration   : 420
      },
      {
        stage_name : "1st Rise",
        temp       : 36,
        motor      : "off",
        duration   : 780
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      },
      {
        stage_name : "2nd Rise",
        temp       : 36,
        motor      : "off",
        duration   : 3120
      },
      {
        stage_name : "Bake",
        temp       : 120,
        motor      : "off",
        duration   : 2100
      }
    ],
    beeps : [
      {
        stage : 3,
        time  : 120,
        count : 8
      }
    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 5,
    crust_id     : 0,
    program_name : "Rapid Bread",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Mix",
        temp       : 30,
        motor      : "onoff",
        duration   : 120
      },
      {
        stage_name : "1st Knead",
        temp       : 30,
        motor      : "on",
        duration   : 300
      },
      {
        stage_name : "Rest",
        temp       : 30,
        motor      : "off",
        duration   : 300
      },
      {
        stage_name : "2nd Knead",
        temp       : 30,
        motor      : "on",
        duration   : 720
      },
      {
        stage_name : "1st Rise",
        temp       : 36,
        motor      : "off",
        duration   : 2400
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      }
    ],
    beeps : [

    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 5,
    crust_id     : 1,
    program_name : "Rapid Bread (light)",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Mix",
        temp       : 30,
        motor      : "onoff",
        duration   : 120
      },
      {
        stage_name : "1st Knead",
        temp       : 30,
        motor      : "on",
        duration   : 300
      },
      {
        stage_name : "Rest",
        temp       : 30,
        motor      : "off",
        duration   : 300
      },
      {
        stage_name : "2nd Knead",
        temp       : 30,
        motor      : "on",
        duration   : 720
      },
      {
        stage_name : "1st Rise",
        temp       : 36,
        motor      : "off",
        duration   : 2400
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      }
    ],
    beeps : [

    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 5,
    crust_id     : 2,
    program_name : "Rapid Bread (dark)",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Mix",
        temp       : 30,
        motor      : "onoff",
        duration   : 120
      },
      {
        stage_name : "1st Knead",
        temp       : 30,
        motor      : "on",
        duration   : 300
      },
      {
        stage_name : "Rest",
        temp       : 30,
        motor      : "off",
        duration   : 300
      },
      {
        stage_name : "2nd Knead",
        temp       : 30,
        motor      : "on",
        duration   : 720
      },
      {
        stage_name : "1st Rise",
        temp       : 36,
        motor      : "off",
        duration   : 2400
      },
      {
        stage_name : "Gas Squeeze",
        temp       : 36,
        motor      : "on",
        duration   : 4
      }
    ],
    beeps : [

    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 6,
    crust_id     : 0,
    program_name : "Cake",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Bake",
        temp       : 110,
        motor      : "off",
        duration   : 3600
      },
      {
        stage_name : "Cool",
        temp       : 50,
        motor      : "off",
        duration   : 1200
      }
    ],
    beeps : [

    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 6,
    crust_id     : 1,
    program_name : "Cake (light)",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Bake",
        temp       : 100,
        motor      : "off",
        duration   : 3600
      },
      {
        stage_name : "Cool",
        temp       : 50,
        motor      : "off",
        duration   : 1200
      }
    ],
    beeps : [

    ],
    warm_temp     : -1,
    max_warm_time : -1
  },
  {
    program_id   : 6,
    crust_id     : 2,
    program_name : "Cake (dark)",
    max_temp_a   : -1,
    max_temp_b   : -1,
    stages       : [
      {
        stage_name : "Bake",
        temp       : 120,
        motor      : "off",
        duration   : 3600
      },
      {
        stage_name : "Cool",
        temp       : 50,
        motor      : "off",
        duration   : 1200
      }
    ],
    beeps : [

    ],
    warm_temp     : -1,
    max_warm_time : -1
  }
]
