#dial-input
A polymer element that simulates a 'dial' sytle input.

##Form
The color of the dial can be set by using three attributes. `dialColor` defines the color of the circle with the position marker. `backColor` defines the color of the outer and inner circles. `accentColor` defines the color of the segments, dial position mark and text. Any valid CSS color value will work.

##Function
The dial can be controlled by mouse or touch by tapping, dragging or using the mouse wheel. Holding the shift key, or using a two point touch gesture will cause the dial to snap to the nearest segment.

##Attributes

###accentColor
String

Defines the color of the segments, dial position mark and text. Any valid CSS color value will work.

###backColor
String

Defines the color of the outer and inner circles. Any valid CSS color value will work.

###decimalAccuracy
Number

Defines to how many decimals the angular value should be accurate to (Using `Math.round()`). A value of `-1` will ignore any decimal rounding. 

###descriptor
String

The label placed under the numeric value displayed in the center of the dial.

###dialColor
String

Defines the color of the circle with the position marker. Any valid CSS color value will work.

###fadeValue
Boolean

If true, the center value display will fade in when input is received and fade out after input has ceased for 500ms.

###hideValue
Boolean

If true, the center value will be hidden.

###largeSegmentInterval
Number

Used to define the interval between larger segment markers.

###loopBack
Boolean

If true, the dial's value will reset to 0 when crossing clockwise across the top segment marker, and to the `revolutionValue` when crossing counter-clockwise. Values of `rangeMax` and `rangeMin` are ignored.

###rangeMax 
Number

Max value of the dial. The dial will not rotate clockwise any further once this value is reached.

###rangeMin 
Number

Minimum value of the dial. The dial will not rotate counter-clockwise any further once this value is reached.

###revolutionValue
Number

The amount the `value` will increase or decrease after a full revolution of the dial.

###scale
Number

Multiplier to define the size of the dial. The default value puts the dial at 128x128px. 0.5 is the minimum recommended value for legibility/usability.

###segmentLock
Boolean

If true, the function of the shift key will be inverted, causing the default action without the shift key to be snapping to the nearest segment marker. Holding the shift key will allow free motion.

###segmentLockTogglable
Boolean

If false, causes the shift key to have no effecton the movement of the dial.

###segments
Number

The number of segment markers on the dial, divided up evenly.

###value
Number

The value of the dial. Updated immediately.

###z
Number

Defines the height of the `paper-shadow` element.