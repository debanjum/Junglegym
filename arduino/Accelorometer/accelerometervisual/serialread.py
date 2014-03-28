#!/usr/bin/env python2
try:
    import serial  
    import time  
except:
    print "Missing Libraries"
  
locations=['/dev/ttyACM1','/dev/ttyACM0','/dev/ttyACM2','/dev/ttyUSB0','/dev/ttyUSB1','/dev/ttyUSB2','/dev/ttyUSB3', '/dev/ttyS0','/dev/ttyS1','/dev/ttyS2','/dev/ttyS3']    
    
for device in locations:    
    try:    
        print "Attempting connection to",device  
        arduino = serial.Serial(device, 9600)
        print "Connection to",device,"succesfully established"
        break
    except:    
        print "Failed to connect on",device     
  
#try:    
#    arduino.write('Y')    
#    time.sleep(1)  
#while 1:
#    print arduino.readline()
#except:    
#    print "Failed to send!"  
