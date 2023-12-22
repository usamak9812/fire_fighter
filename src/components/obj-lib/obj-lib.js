Polymer({
  categories: [
    {
      name:"Vehicle",
      icon:"maps:directions-bus"
    },
    {
      name: "Aircraft",
      icon: "maps:flight"
    },
    {
      name: "Front View",
      icon: "image:panorama"
    },
    {
      name: "Misc",
      icon: "more-horiz"
    }
  ],
  Vehicle: [
    { name: "Airfield Operations",
      type: "vehicle",
      subtype: "basic",
      graphic: "assets/lib/vehicle/Airfield_Operations.svg",
      thumb: "assets/lib/vehicle/Airfield_Operations.svg",
      scale: 1,
      speed: {
        forwardMax: 60,
        reverseMax: 30
      },
      centerOfRotation: 70,
      turnRadius: 10
    },
    { name: "Ambulance",
      type: "vehicle",
      subtype: "basic",
      graphic: "assets/lib/vehicle/ambulence.svg",
      thumb: "assets/lib/vehicle/ambulence.svg",
      scale: 1,
      speed: {
        forwardMax: 50,
        reverseMax: 30
      },
      centerOfRotation: 70,
      turnRadius: 15
    },
    { name: "ARFF Truck 3000",
      type: "vehicle",
      subtype: "ARFF",
      graphic: "/assets/lib/vehicle/ARFF_Truck_red.svg",
      thumb: "/assets/lib/vehicle/ARFF_Truck_red_thumb.svg",
      scale: 1,
      speed: {
        forwardMax: 40,
        reverseMax: 20
      },
      centerOfRotation: 70,
      turnRadius: 31,
      turret: {
        graphic: "/assets/lib/vehicle/ARFF_Truck_turret.svg",
        position: {
          x: 17.5,
          y: 0
        },
        angle: {
          max: Math.PI / 2,
          min: -Math.PI / 2
        },
        agents: {
          "agent_water": {high: 230,low: 190},
          "agent_foam":{high: 230,low: 190},
          "agent_chemical":{high: 100,low: 100},
          "agent_water_chemical":{high: 230,low: 190},
          "agent_foam_chemical":{high: 230,low: 190},
        }
      }
    },
    { name: "ARFF Truck 3000",
      type: "vehicle",
      subtype: "ARFF",
      graphic: "/assets/lib/vehicle/ARFF_Truck.svg",
      thumb: "/assets/lib/vehicle/ARFF_Truck_thumb.svg",
      scale: 1,
      speed: {
        forwardMax: 40,
        reverseMax: 20
      },
      centerOfRotation: 70,
      turnRadius: 31,
      turret: {
        graphic: "/assets/lib/vehicle/ARFF_Truck_turret.svg",
        position: {
          x: 17.5,
          y: 0
        },
        angle: {
          max: Math.PI / 2,
          min: -Math.PI / 2
        },
        agents: {
          "agent_water": {high: 230,low: 190},
          "agent_foam":{high: 230,low: 190},
          "agent_chemical":{high: 100,low: 100},
          "agent_water_chemical":{high: 230,low: 190},
          "agent_foam_chemical":{high: 230,low: 190},
        }
      }
    },
    { name: "HRET",
      type: "vehicle",
      subtype: "HRET",
      graphic: "assets/lib/vehicle/HRET_red.svg",
      thumb: "assets/lib/vehicle/HRET_red_thumb.svg",
      scale: 1,
      speed: {
        forwardMax: 40,
        reverseMax: 20
      },
      centerOfRotation: 70,
      turnRadius: 31,
      turret: {
        graphic: "/assets/lib/vehicle/HRET_nozel.svg",
        position: {
          x: 21.65,
          y: 0.06
        },
        angle: {
          max: Math.PI / 2,
          min: -Math.PI / 2
        },
        agents: {
          "agent_water": {high: 230,low: 190},
          "agent_foam":{high: 230,low: 190},
          "agent_chemical":{high: 100,low: 100},
          "agent_water_chemical":{high: 230,low: 190},
          "agent_foam_chemical":{high: 230,low: 190},
        }
      },
      boom: {
        extended: false,
        pMode: "off"
      }
    },
    { name: "HRET",
      type: "vehicle",
      subtype: "HRET",
      graphic: "assets/lib/vehicle/HRET.svg",
      thumb: "assets/lib/vehicle/HRET_thumb.svg",
      scale: 1,
      speed: {
        forwardMax: 40,
        reverseMax: 20
      },
      centerOfRotation: 70,
      turnRadius: 31,
      turret: {
        graphic: "/assets/lib/vehicle/HRET_nozel.svg",
        position: {
          x: 21.65,
          y: 0.06
        },
        angle: {
          max: Math.PI / 2,
          min: -Math.PI / 2
        },
        agents: {
          "agent_water": {high: 230,low: 190},
          "agent_foam":{high: 230,low: 190},
          "agent_chemical":{high: 100,low: 100},
          "agent_water_chemical":{high: 230,low: 190},
          "agent_foam_chemical":{high: 230,low: 190},
        }
      },
      boom: {
        extended: false,
        pMode: "off"
      }
    },
    { name: "Plow",
      type: "vehicle",
      subtype: "basic-plow",
      graphic: "assets/lib/vehicle/plow_truck.svg",
      thumb: "assets/lib/vehicle/plow_thumb.svg",
      scale: 1,
      speed: {
        forwardMax: 40,
        reverseMax: 20
      },
      centerOfRotation: 70,
      turnRadius: 31,
      plow: {
        offset: 17.5,
        position: 0,
        graphic: "assets/lib/vehicle/plow_plow.svg"
      }
    },
    { name: "Plow with Broom",
      type: "vehicle",
      subtype: "broom-plow",
      graphic: "assets/lib/vehicle/broom_plow_truck.svg",
      thumb: "assets/lib/vehicle/broom_plow_thumb.svg",
      scale: 1,
      speed: {
        forwardMax: 40,
        reverseMax: 20
      },
      centerOfRotation: 70,
      turnRadius: 31,
      plow: {
        offsetA: 40.5,
        offsetB: 3.5,
        position: 0,
        graphicA: "assets/lib/vehicle/broom_plow_plow.svg",
        graphicB: "assets/lib/vehicle/broom_plow_broom.svg"
      }
    },
    { name: "Battalion Chief",
      type: "vehicle",
      subtype: "basic",
      graphic: "assets/lib/vehicle/battalion_chief.svg",
      thumb: "assets/lib/vehicle/battalion_chief.svg",
      scale: 1,
      speed: {
        forwardMax: 60,
        reverseMax: 30
      },
      centerOfRotation: 70,
      turnRadius: 10
    },
    { name: "Crane",
      type: "vehicle",
      subtype: "basic",
      graphic: "assets/lib/vehicle/Crane.svg",
      thumb: "assets/lib/vehicle/Crane.svg",
      scale: 1,
      speed: {
        forwardMax: 40,
        reverseMax: 20
      },
      centerOfRotation: 80,
      turnRadius: 31
    },
    { name: "Fire Engine",
      type: "vehicle",
      subtype: "basic",
      graphic: "assets/lib/vehicle/Fire_Engine.svg",
      thumb: "assets/lib/vehicle/Fire_Engine.svg",
      scale: 1,
      speed: {
        forwardMax: 45,
        reverseMax: 25
      },
      centerOfRotation: 70,
      turnRadius: 20
    },
    { name: "Fire Engine",
      type: "vehicle",
      subtype: "basic",
      graphic: "assets/lib/vehicle/Fire_Engine_yellow.svg",
      thumb: "assets/lib/vehicle/Fire_Engine_yellow.svg",
      scale: 1,
      speed: {
        forwardMax: 45,
        reverseMax: 25
      },
      centerOfRotation: 70,
      turnRadius: 20
    },
    { name: "Fuel Truck",
      type: "vehicle",
      subtype: "basic",
      graphic: "assets/lib/vehicle/fuel_truck.svg",
      thumb: "assets/lib/vehicle/fuel_truck.svg",
      scale: 1,
      speed: {
        forwardMax: 50,
        reverseMax: 30
      },
      centerOfRotation: 70,
      turnRadius: 15
    },
    { name: "Hazmat",
      type: "vehicle",
      subtype: "basic",
      graphic: "assets/lib/vehicle/hazmat.svg",
      thumb: "assets/lib/vehicle/hazmat.svg",
      scale: 1,
      speed: {
        forwardMax: 50,
        reverseMax: 30
      },
      centerOfRotation: 70,
      turnRadius: 15
    },
    { name: "Heavy Rescue Truck",
      type: "vehicle",
      subtype: "basic",
      graphic: "assets/lib/vehicle/heavy_rescue_truck.svg",
      thumb: "assets/lib/vehicle/heavy_rescue_truck.svg",
      scale: 1,
      speed: {
        forwardMax: 45,
        reverseMax: 25
      },
      centerOfRotation: 70,
      turnRadius: 20
    },
    { name: "Ladder Truck",
      type: "vehicle",
      subtype: "basic",
      graphic: "assets/lib/vehicle/Ladder Truck.svg",
      thumb: "assets/lib/vehicle/Ladder Truck.svg",
      scale: 1,
      speed: {
        forwardMax: 45,
        reverseMax: 25
      },
      centerOfRotation: 70,
      turnRadius: 20
    },
    { name: "Ladder Truck",
      type: "vehicle",
      subtype: "basic",
      graphic: "assets/lib/vehicle/Ladder Truck_yellow.svg",
      thumb: "assets/lib/vehicle/Ladder Truck_yellow.svg",
      scale: 1,
      speed: {
        forwardMax: 45,
        reverseMax: 25
      },
      centerOfRotation: 70,
      turnRadius: 20
    },
    { name: "MCI",
      type: "vehicle",
      subtype: "basic",
      graphic: "assets/lib/vehicle/mci.svg",
      thumb: "assets/lib/vehicle/mci.svg",
      scale: 1,
      speed: {
        forwardMax: 50,
        reverseMax: 30
      },
      centerOfRotation: 70,
      turnRadius: 15
    },
    { name: "Mobile Command",
      type: "vehicle",
      subtype: "basic",
      graphic: "assets/lib/vehicle/mobile_command.svg",
      thumb: "assets/lib/vehicle/mobile_command.svg",
      scale: 1,
      speed: {
        forwardMax: 45,
        reverseMax: 25
      },
      centerOfRotation: 70,
      turnRadius: 20
    },
    { name: "Paramedics",
      type: "vehicle",
      subtype: "basic",
      graphic: "assets/lib/vehicle/paramedics.svg",
      thumb: "assets/lib/vehicle/paramedics.svg",
      scale: 1,
      speed: {
        forwardMax: 50,
        reverseMax: 30
      },
      centerOfRotation: 70,
      turnRadius: 15
    },
    { name: "Police",
      type: "vehicle",
      subtype: "basic",
      graphic: "assets/lib/vehicle/police.svg",
      thumb: "assets/lib/vehicle/police.svg",
      scale: 1,
      speed: {
        forwardMax: 60,
        reverseMax: 30
      },
      centerOfRotation: 70,
      turnRadius: 10
    },
    { name: "Rapid Intervention",
      type: "vehicle",
      subtype: "RIV",
      graphic: "assets/lib/vehicle/Rapid_Intervention_Vehicle_red.svg",
      thumb: "assets/lib/vehicle/Rapid_Intervention_Vehicle_red_thumb.svg",
      scale: 1,
      speed: {
        forwardMax: 50,
        reverseMax: 30
      },
      centerOfRotation: 70,
      turnRadius: 15,
      turret: {
        graphic: "/assets/lib/vehicle/RIV_turret.svg",
        position: {
          x: 11.5,
          y: 0
        },
        angle: {
          max: Math.PI / 2,
          min: -Math.PI / 2
        },
        agents: {
          "agent_water": {high: 53,low: 40},
          "agent_foam":{high: 53,low: 40},
          "agent_chemical":{high: 53,low: 40},
          "agent_water_chemical":{high: 53,low: 40},
          "agent_foam_chemical":{high: 53,low: 40},
        }
      }
    },
    { name: "Rapid Intervention",
      type: "vehicle",
      subtype: "RIV",
      graphic: "assets/lib/vehicle/Rapid_Intervention_Vehicle.svg",
      thumb: "assets/lib/vehicle/Rapid_Intervention_Vehicle_thumb.svg",
      scale: 1,
      speed: {
        forwardMax: 50,
        reverseMax: 30
      },
      centerOfRotation: 70,
      turnRadius: 15,
      turret: {
        graphic: "/assets/lib/vehicle/RIV_turret.svg",
        position: {
          x: 11.5,
          y: 0
        },
        angle: {
          max: Math.PI / 2,
          min: -Math.PI / 2
        },
        agents: {
          "agent_water": {high: 53,low: 40},
          "agent_foam":{high: 53,low: 40},
          "agent_chemical":{high: 53,low: 40},
          "agent_water_chemical":{high: 53,low: 40},
          "agent_foam_chemical":{high: 53,low: 40},
        }
      }
    },
    { name: "Stair Truck",
      type: "vehicle",
      subtype: "basic",
      graphic: "assets/lib/vehicle/Stair_Truck.svg",
      thumb: "assets/lib/vehicle/Stair_Truck.svg",
      scale: 1,
      speed: {
        forwardMax: 50,
        reverseMax: 30
      },
      centerOfRotation: 70,
      turnRadius: 15
    },
    { name: "Transport Bus",
      type: "vehicle",
      subtype: "basic",
      graphic: "assets/lib/vehicle/transport_bus.svg",
      thumb: "assets/lib/vehicle/transport_bus.svg",
      scale: 1,
      speed: {
        forwardMax: 45,
        reverseMax: 25
      },
      centerOfRotation: 70,
      turnRadius: 20
    },
    { name: "Water Tender",
      type: "vehicle",
      subtype: "basic",
      graphic: "assets/lib/vehicle/water_tender.svg",
      thumb: "assets/lib/vehicle/water_tender.svg",
      scale: 1,
      speed: {
        forwardMax: 50,
        reverseMax: 30
      },
      centerOfRotation: 70,
      turnRadius: 15
    }
  ],
  Aircraft: [
    {"name":"737xxA3","graphic":"assets/lib/aircraft/737xxA3/737xxA3.svg","parts":[{"name":"737xxA3_engine_L_1","offset":{"x":114.60000000000004,"y":109.19999999999987}},{"name":"737xxA3_engine_R_2","offset":{"x":142.6,"y":109.09999999999998}},{"name":"737xxA3_tail_L","offset":{"x":115.9999999999999,"y":177.69999999999982}},{"name":"737xxA3_tail_R","offset":{"x":140.50000000000028,"y":177.8000000000001}},{"name":"737xxA3_wing_L_1","offset":{"x":112.59999999999991,"y":115.80000000000013}},{"name":"737xxA3_wing_L_2","offset":{"x":85.79999999999986,"y":127.80000000000011}},{"name":"737xxA3_wing_R_1","offset":{"x":144.3999999999998,"y":115.79999999999971}},{"name":"737xxA3_wing_R_2","offset":{"x":171.20000000000022,"y":127.70000000000013}},{"name":"737xxA3_fuselage_1","offset":{"x":128.39999999999995,"y":81.00000000000006}},{"name":"737xxA3_fuselage_2","offset":{"x":128.40000000000006,"y":123.59999999999985}},{"name":"737xxA3_fuselage_3","offset":{"x":128.39999999999998,"y":170.8000000000002}}]},
    {"name":"747xxA3","graphic":"assets/lib/aircraft/747xxA3/747xxA3.svg","parts":[{"name":"747xxA3_engine_L_1","offset":{"x":65.39999999999992,"y":110.6999999999999}},{"name":"747xxA3_engine_L_2","offset":{"x":94.09999999999994,"y":88.0000000000002}},{"name":"747xxA3_engine_R_3","offset":{"x":163.4000000000004,"y":88.00000000000007}},{"name":"747xxA3_engine_R_4","offset":{"x":192.1000000000001,"y":110.5999999999998}},{"name":"747xxA3_fuselage_1","offset":{"x":128.69999999999987,"y":38.2}},{"name":"747xxA3_fuselage_2","offset":{"x":128.79999999999987,"y":108.90000000000006}},{"name":"747xxA3_tail_L","offset":{"x":108.3,"y":205.19999999999985}},{"name":"747xxA3_fuselage_3","offset":{"x":128.79999999999987,"y":198}},{"name":"747xxA3_tail_R","offset":{"x":149.39999999999972,"y":205.09999999999954}},{"name":"747xxA3_wing_L_1","offset":{"x":100.4000000000001,"y":96.5000000000004}},{"name":"747xxA3_wing_L_2","offset":{"x":59.49999999999994,"y":124.49999999999972}},{"name":"747xxA3_wing_R_1","offset":{"x":157.70000000000047,"y":96.50000000000033}},{"name":"747xxA3_wing_R_2","offset":{"x":198.20000000000033,"y":124.50000000000006}}]},
    {"name":"757xxA3","graphic":"assets/lib/aircraft/757xxA3/757xxA3.svg","parts":[{"name":"757xxA3_engine_L_1","offset":{"x":109.70000000000005,"y":104.09999999999997}},{"name":"757xxA3_engine_R_2","offset":{"x":147.20000000000002,"y":104.09999999999997}},{"name":"757xxA3_tail_L","offset":{"x":113.30000000000011,"y":183.9000000000002}},{"name":"757xxA3_tail_R","offset":{"x":143.7000000000001,"y":183.90000000000003}},{"name":"757xxA3_wing_L_1","offset":{"x":112.29999999999998,"y":114.09999999999997}},{"name":"757xxA3_wing_L_2","offset":{"x":85.3,"y":121.3}},{"name":"757xxA3_wing_R_1","offset":{"x":144,"y":114.10000000000002}},{"name":"757xxA3_wing_R_2","offset":{"x":171.30000000000004,"y":121.30000000000005}},{"name":"757xxA3_fuselage_1","offset":{"x":128.4000000000001,"y":75.20000000000003}},{"name":"757xxA3_fuselage_2","offset":{"x":128.10000000000016,"y":119.1999999999998}},{"name":"757xxA3_fuselage_3","offset":{"x":128.45,"y":174.2}}]},
    {"name":"767xxA3","graphic":"assets/lib/aircraft/767xxA3/767xxA3.svg","parts":[{"name":"767xxA3_engine_L","offset":{"x":103.07142857142837,"y":107.32380952380956}},{"name":"767xxA3_engine_R","offset":{"x":154.48095238095235,"y":107.4523809523809}},{"name":"767xxA3_tail_L","offset":{"x":113.9761904761905,"y":196.0428571428571}},{"name":"767xxA3_tail_R","offset":{"x":143.3095238095238,"y":195.9714285714288}},{"name":"767xxA3_wing_L_2","offset":{"x":73.50476190476192,"y":139.71428571428572}},{"name":"767xxA3_wing_L_1","offset":{"x":104.82380952380953,"y":120.46190476190478}},{"name":"767xxA3_wing_R_2","offset":{"x":184.0476190476192,"y":139.55714285714285}},{"name":"767xxA3_wing_R_1","offset":{"x":152.22857142857157,"y":120.20952380952386}},{"name":"767xxA3_fuselage_1","offset":{"x":128.41904761904757,"y":58.466666666666725}},{"name":"767xxA3_fuselage_2","offset":{"x":128.6952380952381,"y":117.62857142857133}},{"name":"767xxA3_fuselage_3","offset":{"x":128.62380952380943,"y":187.96190476190512}}]},
    {"name":"777xxA3","graphic":"assets/lib/aircraft/777xxA3/777xxA3.svg","parts":[{"name":"777xxA3_wing_R_2","offset":{"x":201.2727272727272,"y":136.3030303030303}},{"name":"777xxA3_engine_R_2","offset":{"x":155.95454545454547,"y":102.40909090909093}},{"name":"777xxA3_wing_R_1","offset":{"x":156.3939393939393,"y":115.40909090909096}},{"name":"777xxA3_wing_L_2","offset":{"x":54.72727272727282,"y":136.3484848484847}},{"name":"777xxA3_engine_L_1","offset":{"x":99.93939393939391,"y":102.46969696969703}},{"name":"777xxA3_wing_L_1","offset":{"x":99.50000000000003,"y":115.30303030303031}},{"name":"777xxA3_tail_R","offset":{"x":143.5757575757575,"y":203.1363636363636}},{"name":"777xxA3_tail_L","offset":{"x":112.51515151515157,"y":203.10606060606023}},{"name":"777xxA3_fuselage_3","offset":{"x":128.4747474747474,"y":187.65151515151516}},{"name":"777xxA3_fuselage_2","offset":{"x":128.34848484848484,"y":112.5}},{"name":"777xxA3_fuselage_1","offset":{"x":128.1969696969697,"y":52.348484848484844}}]},
    {"name":"777-CargoxxA3","graphic":"assets/lib/aircraft/777-CargoxxA3/777-CargoxxA3.svg","parts":[{"name":"777-CargoxxA3_engine_L_1","offset":{"x":98.41304347826082,"y":101.43236714975848}},{"name":"777-CargoxxA3_engine_R_2","offset":{"x":157.47101449275337,"y":101.55314009661839}},{"name":"777-CargoxxA3_fuselage_1","offset":{"x":128.15497076023377,"y":49.67543859649119}},{"name":"777-CargoxxA3_fuselage_2","offset":{"x":128.15497076023377,"y":107.94444444444439}},{"name":"777-CargoxxA3_tail_R","offset":{"x":143.08695652173935,"y":203.391304347826}},{"name":"777-CargoxxA3_tail_L","offset":{"x":113.15942028985505,"y":203.149758454106}},{"name":"777-CargoxxA3_fuselage_3","offset":{"x":128.45652173912998,"y":185.50483091787427}},{"name":"777-CargoxxA3_wing_L_1","offset":{"x":99.48067632850244,"y":115.44685990338147}},{"name":"777-CargoxxA3_wing_L_2","offset":{"x":52.099033816425106,"y":137.03623188405777}},{"name":"777-CargoxxA3_wing_R_1","offset":{"x":156.36473429951724,"y":115.68840579710142}},{"name":"777-CargoxxA3_wing_R_2","offset":{"x":204.53864734299506,"y":137.3985507246377}}]},
    {"name":"A-310xxA3","graphic":"assets/lib/aircraft/A-310xxA3/A-310xxA3.svg","parts":[{"name":"A-310xxA3_engine_L_1","offset":{"x":106.81666666666662,"y":98.31666666666676}},{"name":"A-310xxA3_engine_R_2","offset":{"x":149.88333333333333,"y":98.26666666666662}},{"name":"A-310xxA3_tail_L","offset":{"x":114.8666666666665,"y":177.99999999999991}},{"name":"A-310xxA3_tail_R","offset":{"x":142.216666666667,"y":177.90000000000023}},{"name":"A-310xxA3_wing_L_1","offset":{"x":107.28333333333318,"y":110.13333333333321}},{"name":"A-310xxA3_wing_L_2","offset":{"x":80.54999999999994,"y":124.91666666666664}},{"name":"A-310xxA3_wing_R_1","offset":{"x":149.8666666666667,"y":110.14999999999999}},{"name":"A-310xxA3_wing_R_2","offset":{"x":177.19999999999993,"y":124.94999999999992}},{"name":"A-310xxA3_fuselage_1","offset":{"x":128.83333333333326,"y":73.48333333333335}},{"name":"A-310xxA3_fuselage_2","offset":{"x":128.45000000000005,"y":115.76666666666662}},{"name":"A-310xxA3_fuselage_3","offset":{"x":128.44999999999996,"y":170.94999999999976}}]},
    {"name":"A-320xxA3","graphic":"assets/lib/aircraft/A-320xxA3/A-320xxA3.svg","parts":[{"name":"A-320xxA3_engine_L_1","offset":{"x":111.39999999999999,"y":108.6}},{"name":"A-320xxA3_engine_R_2","offset":{"x":145.6,"y":108.69999999999997}},{"name":"A-320xxA3_tail_L","offset":{"x":117.59999999999991,"y":171.40000000000003}},{"name":"A-320xxA3_tail_R","offset":{"x":139.90000000000006,"y":171.5}},{"name":"A-320xxA3_wing_L_1","offset":{"x":112.69999999999992,"y":114.90000000000013}},{"name":"A-320xxA3_wing_L_2","offset":{"x":89.8,"y":126.5}},{"name":"A-320xxA3_wing_R_1","offset":{"x":143.80000000000004,"y":114.89999999999993}},{"name":"A-320xxA3_wing_R_2","offset":{"x":167.40000000000012,"y":126.4}},{"name":"A-320xxA3_fuselage_1","offset":{"x":128.50000000000003,"y":86.40000000000006}},{"name":"A-320xxA3_fuselage_2","offset":{"x":128.49999999999994,"y":122.59999999999984}},{"name":"A-320xxA3_fuselage_3","offset":{"x":128.5,"y":164.09999999999997}}]},
    {"name":"A-380xxA3","graphic":"assets/lib/aircraft/A-380xxA3/A-380xxA3.svg","parts":[{"name":"A-380xxA3_engine_L_1","offset":{"x":54.300000000000054,"y":108.79999999999967}},{"name":"A-380xxA3_engine_L_2","offset":{"x":86.39999999999995,"y":87.29999999999976}},{"name":"A-380xxA3_engine_R_3","offset":{"x":171.0000000000001,"y":87.29999999999995}},{"name":"A-380xxA3_engine_R_4","offset":{"x":203.1000000000001,"y":108.69999999999985}},{"name":"A-380xxA3_tail_L","offset":{"x":103.60000000000001,"y":204.5}},{"name":"A-380xxA3_tail_R","offset":{"x":153.79999999999987,"y":204.4999999999999}},{"name":"A-380xxA3_wing_L_1","offset":{"x":95.7,"y":97.90000000000002}},{"name":"A-380xxA3_wing_L_2","offset":{"x":43.7,"y":131.2000000000001}},{"name":"A-380xxA3_wing_R_1","offset":{"x":161.20000000000024,"y":97.70000000000002}},{"name":"A-380xxA3_wing_R_2","offset":{"x":213.69999999999996,"y":130.89999999999995}},{"name":"A-380xxA3_fuselage_1","offset":{"x":128.30000000000004,"y":42.2}},{"name":"A-380xxA3_fuselage_2","offset":{"x":128.30000000000007,"y":109.6000000000001}},{"name":"A-380xxA3_fuselage_3","offset":{"x":128.4000000000001,"y":196.50000000000017}}]},
    {"name":"B-206xxA3","graphic":"assets/lib/aircraft/B-206xxA3/B-206xxA3.svg","parts":[{"name":"B-206xxA3_skid_L","offset":{"x":125.40000000000023,"y":120.60000000000076}},{"name":"B-206xxA3_skid_R","offset":{"x":131.3999999999999,"y":120.60000000000076}},{"name":"B-206xxA3_fuselage_1","offset":{"x":128.69999999999982,"y":115.70000000000006}},{"name":"B-206xxA3_fuselage_2","offset":{"x":128.30000000000007,"y":126.90000000000009}},{"name":"B-206xxA3_fuselage_3","offset":{"x":128.39999999999995,"y":143.0000000000001}},{"name":"B-206xxA3_top_rotter_blades","offset":{"x":128.5,"y":123.29999999999994}}]},
    {"name":"B-212xxA3","graphic":"assets/lib/aircraft/B-212xxA3/B-212xxA3.svg","parts":[{"name":"B-212xxA3_skid_L","offset":{"x":122.90000000000002,"y":118.79999999999991}},{"name":"B-212xxA3_skid_R","offset":{"x":133.09999999999994,"y":118.79999999999998}},{"name":"B-212xxA3_fuselage_1","offset":{"x":128.00000000000006,"y":111.1000000000001}},{"name":"B-212xxA3_fuselage_2","offset":{"x":127.99999999999993,"y":124.80000000000011}},{"name":"B-212xxA3_fuselage_3","offset":{"x":128.00000000000003,"y":146.60000000000034}},{"name":"B-212xxA3_top_rotter_blades","offset":{"x":128.0000000000001,"y":120.10000000000014}}]},
    {"name":"C-172xxA3","graphic":"assets/lib/aircraft/C-172xxA3/C-172xxA3.svg","parts":[{"name":"C-172xxA3_tail_L","offset":{"x":125.4,"y":135.8999999999999}},{"name":"C-172xxA3_tail_R","offset":{"x":131.00000000000006,"y":135.89999999999992}},{"name":"C-172xxA3_wing_L_1","offset":{"x":123.20000000000005,"y":123.50000000000007}},{"name":"C-172xxA3_wing_L_2","offset":{"x":115.60000000000005,"y":123.30000000000007}},{"name":"C-172xxA3_wing_R_1","offset":{"x":133.69999999999993,"y":123.50000000000016}},{"name":"C-172xxA3_wing_R_2","offset":{"x":140.60000000000002,"y":123.30000000000001}},{"name":"C-172xxA3_fuselage_1","offset":{"x":128.30000000000007,"y":119.80000000000013}},{"name":"C-172xxA3_fuselage_2","offset":{"x":128.10000000000008,"y":133.10000000000008}}]},
    {"name":"CRJ-700xxA3","graphic":"assets/lib/aircraft/CRJ-700xxA3/CRJ-700xxA3.svg","parts":[{"name":"CRJ-700xxA3_engine_L_1","offset":{"x":121.89999999999998,"y":149.19999999999996}},{"name":"CRJ-700xxA3_engine_R_2","offset":{"x":134.00000000000006,"y":149.20000000000002}},{"name":"CRJ-700xxA3_tail_L","offset":{"x":119.19999999999996,"y":174.99999999999991}},{"name":"CRJ-700xxA3_tail_R","offset":{"x":136.39999999999998,"y":175}},{"name":"CRJ-700xxA3_wing_L_1","offset":{"x":116.69999999999997,"y":124.99999999999996}},{"name":"CRJ-700xxA3_wing_L_2","offset":{"x":100.70000000000002,"y":132.7}},{"name":"CRJ-700xxA3_wing_R_1","offset":{"x":139.20000000000016,"y":125.00000000000001}},{"name":"CRJ-700xxA3_wing_R_2","offset":{"x":155.30000000000004,"y":132.70000000000005}},{"name":"CRJ-700xxA3_fuselage_1","offset":{"x":128,"y":89.69999999999999}},{"name":"CRJ-700xxA3_fuselage_2","offset":{"x":127.9,"y":120.20000000000005}},{"name":"CRJ-700xxA3_fuselage_3","offset":{"x":127.90000000000009,"y":158.20000000000002}}]},
    {"name":"D8-Q400xxA3","graphic":"assets/lib/aircraft/D8-Q400xxA3/D8-Q400xxA3.svg","parts":[{"name":"D8-Q400xxA3_fuselage_1","offset":{"x":128.20000000000007,"y":88.7999999999999}},{"name":"D8-Q400xxA3_fuselage_2","offset":{"x":128.20000000000002,"y":119.79999999999998}},{"name":"D8-Q400xxA3_fuselage_3","offset":{"x":128.60000000000005,"y":158.6999999999999}},{"name":"D8-Q400xxA3_tail_L","offset":{"x":120.39999999999985,"y":175.19999999999985}},{"name":"D8-Q400xxA3_tail_R","offset":{"x":136.10000000000022,"y":175.10000000000008}},{"name":"D8-Q400xxA3_wing_L_1","offset":{"x":117.39999999999978,"y":116.99999999999997}},{"name":"D8-Q400xxA3_wing_L_2","offset":{"x":95.69999999999992,"y":117.90000000000003}},{"name":"D8-Q400xxA3_wing_R_1","offset":{"x":138.90000000000072,"y":116.89999999999999}},{"name":"D8-Q400xxA3_wing_R_2","offset":{"x":161.09999999999997,"y":117.79999999999988}}]},
    {"name":"DHC-6xxA3","graphic":"assets/lib/aircraft/DHC-6xxA3/DHC-6xxA3.svg","parts":[{"name":"DHC-6xxA3_fuselage_1","offset":{"x":128.60000000000002,"y":112.90000000000003}},{"name":"DHC-6xxA3_fuselage_2","offset":{"x":128.60000000000014,"y":138.10000000000025}},{"name":"DHC-6xxA3_tail_L","offset":{"x":123.39999999999985,"y":142.89999999999984}},{"name":"DHC-6xxA3_tail_R","offset":{"x":133.4,"y":142.89999999999978}},{"name":"DHC-6xxA3_wing_L_1","offset":{"x":119.49999999999973,"y":118.40000000000008}},{"name":"DHC-6xxA3_wing_L_2","offset":{"x":106.19999999999986,"y":120.89999999999978}},{"name":"DHC-6xxA3_wing_R_1","offset":{"x":137.6000000000001,"y":118.40000000000022}},{"name":"DHC-6xxA3_wing_R_2","offset":{"x":150.49999999999974,"y":120.90000000000009}}]},
    {"name":"Dornier-328xxA3","graphic":"assets/lib/aircraft/Dornier-328xxA3/Dornier-328xxA3.svg","parts":[{"name":"Dornier-328xxA3_tail_L","offset":{"x":122.09999999999988,"y":157.0999999999996}},{"name":"Dornier-328xxA3_tail_R","offset":{"x":134.9000000000002,"y":156.99999999999898}},{"name":"Dornier-328xxA3_fuselage_1","offset":{"x":128.50000000000006,"y":105.10000000000005}},{"name":"Dornier-328xxA3_fuselage_2","offset":{"x":128.50000000000006,"y":125.89999999999993}},{"name":"Dornier-328xxA3_fuselage_3","offset":{"x":128.50000000000017,"y":149.49999999999994}},{"name":"Dornier-328xxA3_wing_L_1","offset":{"x":119.99999999999996,"y":113.60000000000021}},{"name":"Dornier-328xxA3_wing_L_2","offset":{"x":105.20000000000029,"y":118.00000000000026}},{"name":"Dornier-328xxA3_wing_R_1","offset":{"x":137.00000000000003,"y":113.60000000000008}},{"name":"Dornier-328xxA3_wing_R_2","offset":{"x":151.89999999999998,"y":117.99999999999993}}]},
    {"name":"E-190xxA3","graphic":"assets/lib/aircraft/E-190xxA3/E-190xxA3.svg","parts":[{"name":"E-190xxA3_engine_L","offset":{"x":113.09999999999984,"y":117.1}},{"name":"E-190xxA3_engine_R","offset":{"x":142.8000000000001,"y":116.99999999999999}},{"name":"E-190xxA3_fuselage_1","offset":{"x":128.0000000000001,"y":88.90000000000018}},{"name":"E-190xxA3_fuselage_2","offset":{"x":128.00000000000003,"y":126.80000000000007}},{"name":"E-190xxA3_fuselage_3","offset":{"x":127.99999999999994,"y":166.49999999999994}},{"name":"E-190xxA3_tail_L","offset":{"x":118.90000000000005,"y":180.2999999999998}},{"name":"E-190xxA3_tail_R","offset":{"x":136.7000000000004,"y":180.20000000000016}},{"name":"E-190xxA3_wing_L_1","offset":{"x":113.1999999999997,"y":124.19999999999986}},{"name":"E-190xxA3_wing_L_2","offset":{"x":93.49999999999999,"y":133.69999999999976}},{"name":"E-190xxA3_wing_R_1","offset":{"x":142.3000000000006,"y":124.00000000000038}},{"name":"E-190xxA3_wing_R_2","offset":{"x":162.7000000000005,"y":133.50000000000023}}]},
    {"name":"F-22xxA3","graphic":"assets/lib/aircraft/F-22xxA3/F-22xxA3.svg","parts":[{"name":"F-22xxA3_tail_L_2","offset":{"x":118.09999999999985,"y":153.4000000000003}},{"name":"F-22xxA3_tail_R_2","offset":{"x":139.00000000000014,"y":153.30000000000007}},{"name":"F-22xxA3_wing_L","offset":{"x":113.80000000000007,"y":135.99999999999994}},{"name":"F-22xxA3_wing_R","offset":{"x":143.19999999999985,"y":135.9000000000003}},{"name":"F-22xxA3_tail_L_1","offset":{"x":120.49999999999983,"y":147.0000000000001}},{"name":"F-22xxA3_fuselage_1","offset":{"x":128.50000000000009,"y":114.99999999999993}},{"name":"F-22xxA3_fuselage_2","offset":{"x":128.50000000000017,"y":144.3999999999999}},{"name":"F-22xxA3_tail_R_1","offset":{"x":136.49999999999994,"y":146.89999999999986}}]},
    {"name":"Falcon2000xxA3","graphic":"assets/lib/aircraft/Falcon2000xxA3/Falcon2000xxA3.svg","parts":[{"name":"Falcon2000xxA3_engine_L_1","offset":{"x":123.69999999999992,"y":141.29999999999993}},{"name":"Falcon2000xxA3_engine_R_2","offset":{"x":133.30000000000007,"y":141.30000000000004}},{"name":"Falcon2000xxA3_wing_L_1","offset":{"x":119.50000000000001,"y":125.49999999999986}},{"name":"Falcon2000xxA3_wing_L_2","offset":{"x":108.19999999999996,"y":131.6}},{"name":"Falcon2000xxA3_wing_R_1","offset":{"x":137.3000000000001,"y":125.50000000000006}},{"name":"Falcon2000xxA3_wing_R_2","offset":{"x":148.60000000000014,"y":131.60000000000014}},{"name":"Falcon2000xxA3_fuselage_1","offset":{"x":128.70000000000002,"y":105.49999999999997}},{"name":"Falcon2000xxA3_fuselage_2","offset":{"x":128.70000000000002,"y":125.4999999999999}},{"name":"Falcon2000xxA3_fuselage_3","offset":{"x":128.40000000000003,"y":148.10000000000002}},{"name":"Falcon2000xxA3_tail_L","offset":{"x":121.89999999999988,"y":152.29999999999995}},{"name":"Falcon2000xxA3_tail_R","offset":{"x":135.50000000000009,"y":152.20000000000005}}]},
    {"name":"GS-5xxA3","graphic":"assets/lib/aircraft/GS-5xxA3/GS-5xxA3.svg","parts":[{"name":"GS-5xxA3_engine_L_1","offset":{"x":122.1000000000002,"y":142.19999999999982}},{"name":"GS-5xxA3_engine_R_2","offset":{"x":135.49999999999983,"y":141.99999999999983}},{"name":"GS-5xxA3_tail_L","offset":{"x":118.19999999999983,"y":166.9999999999998}},{"name":"GS-5xxA3_tail_R","offset":{"x":139.5000000000001,"y":166.9999999999999}},{"name":"GS-5xxA3_wing_L_1","offset":{"x":115.10000000000008,"y":123.80000000000013}},{"name":"GS-5xxA3_wing_L_2","offset":{"x":95.20000000000003,"y":132}},{"name":"GS-5xxA3_fuselage_1","offset":{"x":128.70000000000016,"y":95.80000000000008}},{"name":"GS-5xxA3_fuselage_2","offset":{"x":128.5000000000002,"y":123.80000000000028}},{"name":"GS-5xxA3_fuselage_3","offset":{"x":128.40000000000012,"y":156.4999999999997}},{"name":"GS-5xxA3_wing_R_1","offset":{"x":141.60000000000002,"y":123.79999999999997}},{"name":"GS-5xxA3_wing_R_2","offset":{"x":162.10000000000045,"y":132.00000000000028}}]},
    {"name":"IL-96xxA3","graphic":"assets/lib/aircraft/IL-96xxA3/IL-96xxA3.svg","parts":[{"name":"IL-96xxA3_engine_L_1","offset":{"x":102.10000000000048,"y":104.69999999999972}},{"name":"IL-96xxA3_engine_L_2","offset":{"x":85.79999999999998,"y":113.69999999999993}},{"name":"IL-96xxA3_engine_R_3","offset":{"x":154.00000000000014,"y":104.79999999999978}},{"name":"IL-96xxA3_engine_R_4","offset":{"x":170.30000000000013,"y":113.80000000000001}},{"name":"IL-96xxA3_tail_L","offset":{"x":112.09999999999991,"y":188.19999999999993}},{"name":"IL-96xxA3_tail_R","offset":{"x":143.89999999999984,"y":188.19999999999965}},{"name":"IL-96xxA3_wing_L_1","offset":{"x":103.90000000000016,"y":114.60000000000012}},{"name":"IL-96xxA3_wing_L_2","offset":{"x":66.00000000000001,"y":132.19999999999982}},{"name":"IL-96xxA3_wing_R_1","offset":{"x":152.1000000000004,"y":114.60000000000012}},{"name":"IL-96xxA3_wing_R_2","offset":{"x":189.99999999999994,"y":132.19999999999993}},{"name":"IL-96xxA3_fuselage_1","offset":{"x":128,"y":61.80000000000014}},{"name":"IL-96xxA3_fuselage_2","offset":{"x":128.00000000000006,"y":112.60000000000001}},{"name":"IL-96xxA3_fuselage_3","offset":{"x":127.99999999999991,"y":179.0999999999999}}]},
    {"name":"KingAir-350xxA3","graphic":"assets/lib/aircraft/KingAir-350xxA3/KingAir-350xxA3.svg","parts":[{"name":"KingAir-350xxA3_engine_L_1","offset":{"x":119.80000000000004,"y":112.90000000000008}},{"name":"KingAir-350xxA3_engine_R_2","offset":{"x":136.69999999999996,"y":112.99999999999994}},{"name":"KingAir-350xxA3_tail_L","offset":{"x":123.70000000000004,"y":148.89999999999992}},{"name":"KingAir-350xxA3_tail_R","offset":{"x":133.40000000000013,"y":148.89999999999998}},{"name":"KingAir-350xxA3_wing_L_1","offset":{"x":121.79999999999995,"y":122.2}},{"name":"KingAir-350xxA3_wing_L_2","offset":{"x":108.49999999999983,"y":121.60000000000002}},{"name":"KingAir-350xxA3_wing_R_1","offset":{"x":135.20000000000005,"y":122.30000000000005}},{"name":"KingAir-350xxA3_wing_R_2","offset":{"x":148.70000000000016,"y":121.69999999999992}},{"name":"KingAir-350xxA3_fuselage_1","offset":{"x":128.30000000000008,"y":111.40000000000003}},{"name":"KingAir-350xxA3_fuselage_2","offset":{"x":128.30000000000002,"y":124.09999999999991}},{"name":"KingAir-350xxA3_fuselage_3","offset":{"x":128.30000000000002,"y":140.49999999999994}}]}
  ],
  "Front View": [
    {
      name: "Fuel Leak Stream",
      offset: true,
      layer: 5,
      graphic: "/assets/anim/side/fuel_leak_stream.gif",
      width: 256,
      height: 512,
      frames: 30
    },
    {
      name: "Fuel Leak Puddle",
      offset: true,
      layer: 5,
      graphic: "/assets/anim/side/fuel_leak_puddle.gif",
      width: 256,
      height: 128,
      frames: 30
    },
    {
      name: "Fuel Leak Fire",
      offset: true,
      layer: 5,
      graphic: "/assets/anim/side/fuel_fire.gif",
      width: 256,
      height: 512,
      frames: 60
    },
    {
      name: "Fuel Drops Fire",
      offset: true,
      layer: 5,
      graphic: "/assets/anim/side/portrait_fire_drops.gif",
      width: 256,
      height: 512,
      frames: 61
    },
    {
      name: "Fire Column",
      offset: true,
      layer: 5,
      graphic: "/assets/anim/side/portrait_fire.gif",
      width: 256,
      height: 512,
      frames: 30
    },
    {
      name: "Small Fire A",
      offset: true,
      layer: 5,
      graphic: "/assets/anim/side/portrait_fire_small_a.gif",
      width: 256,
      height: 256,
      frames: 30
    },
    {
      name: "Small Fire B",
      offset: true,
      layer: 5,
      graphic: "/assets/anim/side/portrait_fire_small_b.gif",
      width: 256,
      height: 256,
      frames: 30
    },
    {
      name: "Small Fire C",
      offset: true,
      layer: 5,
      graphic: "/assets/anim/side/portrait_fire_small_c.gif",
      width: 256,
      height: 256,
      frames: 30
    },
    {
      name: "Fire Extension",
      offset: true,
      layer: 5,
      graphic: "/assets/anim/side/round_bottom_fire.gif",
      width: 256,
      height: 256,
      frames: 30
    },
    {
      name: "Large Fire",
      offset: true,
      layer: 5,
      graphic: "/assets/anim/side/portrait_fire_large.gif",
      width: 256,
      height: 348,
      frames: 50
    },
    {
      name: "Smoke Column",
      offset: true,
      layer: 5,
      graphic: "/assets/anim/side/portrait_smoke.gif",
      width: 256,
      height: 512,
      frames: 60
    },
    {
      name: "Curved Smoke Column",
      offset: true,
      layer: 5,
      graphic: "/assets/anim/side/portrait_smoke_curved.gif",
      width: 256,
      height: 256,
      frames: 30
    },
    {
      name: "Smoke Extension",
      offset: true,
      layer: 5,
      graphic: "/assets/anim/side/portrait_fire_column.gif",
      width: 256,
      height: 512,
      frames: 30
    },
    {
      name: "Small Smoke Extension",
      offset: true,
      layer: 5,
      graphic: "/assets/anim/side/smoke_column_half_sized.gif",
      width: 256,
      height: 256,
      frames: 30
    },
    {
      name: "Smoke Layer",
      offset: false,
      layer: 5,
      graphic: "/assets/anim/side/portrait_ambient_smoke.gif",
      width: 256,
      height: 128,
      frames: 60
    },
    {
      name: "Smoke Cloud",
      offset: false,
      layer: 5,
      graphic: "/assets/anim/side/portrait_central_smoke.gif",
      width: 512,
      height: 512,
      frames: 30
    },
    {
      name: "Drifting Smoke Cloud",
      offset: false,
      layer: 5,
      graphic: "/assets/anim/side/portrait_central_smoke_drift.gif",
      width: 512,
      height: 512,
      frames: 30
    }
  ],
  Misc: [
    {
      name: "Hot Zone",
      type: "warn",
      warn: "hot",
      layer: 1,
      graphic: "/assets/lib/other/hot_zone.svg"
    },
    {
      name: "Warm Zone",
      type: "warn",
      warn: "warm",
      layer: 1,
      graphic: "/assets/lib/other/warm_zone.svg"
    },
    {
      name: "Clock Position",
      type: "clock",
      layer: 1,
      graphic: "/assets/lib/other/clock_position.svg"
    },
    {
      name: "Custom Image",
      type: "image",
      layer: 1,
      graphic: "/assets/img/image-icon.svg",
      
    },
    {
      name: "Label",
      type: "label",
      layer: 1,
      graphic: "/assets/img/label-icon.svg"
    },
    {
      name: "Mask",
      type: "mask",
      layer: 5,
      graphic: "/assets/img/rectangle-structure-icon.svg"
    },
    {
      name: "Rectangle Structure",
      type: "structure",
      layer: 1,
      graphic: "/assets/img/rectangle-structure-icon.svg"
    },
    {
      name: "Round Structure",
      type: "structure",
      layer: 1,
      graphic: "/assets/img/round-structure-icon.svg"
    },
    {
      name: "Evacuation Slide",
      type: "evacuees",
      layer: 1,
      graphic: "/assets/lib/other/escape_slide_long.svg"
    },
    {
      name: "Evacuees",
      type: "evacuees",
      layer: 1,
      graphic: "/assets/lib/other/evacuee_run_thumb.svg"
    },
    {
      name: "Ladder",
      type: "interactive",
      layer: 4,
      graphic: "/assets/lib/other/ladder.svg"
    },
    {
      name: "Triage",
      type: "interactive",
      layer: 1,
      graphic: "/assets/lib/other/triage_sector.svg"
    },
    {
      name: "Fire Hydrant",
      type: "interactive",
      layer: 1,
      graphic: "/assets/lib/other/fire_hydrant.svg"
    },
    {
      name: "Fuel Leak",
      type: "leak",
      layer: 1,
      graphic: "/assets/lib/other/fuel_leak.gif"
    },
    {
      name: "Fuel Puddle",
      type: "leak",
      layer: 1,
      graphic: "/assets/lib/other/fuel_puddle.gif"
    },
    {
      name: "Chair Debris",
      type: "interactive",
      layer: 1,
      graphic: "/assets/lib/other/chair_1.svg"
    },
    {
      name: "Hull Debris",
      type: "interactive",
      layer: 1,
      graphic: "/assets/lib/other/hull_1.svg"
    },
    {
      name: "Hull Debris",
      type: "interactive",
      layer: 1,
      graphic: "/assets/lib/other/hull_2.svg"
    },
    {
      name: "Window Debris",
      type: "interactive",
      layer: 1,
      graphic: "/assets/lib/other/windows.svg"
    },
    {
      name: "Casualty",
      type: "casualty",
      layer: 1,
      graphic: "/assets/lib/other/dead_blue.svg"
    },
    {
      name: "Casualty Group",
      type: "simple",
      layer: 1,
      graphic: "/assets/lib/other/dead_group.svg"
    }
  ]
});