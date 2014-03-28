#!/usr/bin/env python2

#Importing required modules
try:
	from gi.repository import Gtk
        import serial
        import os
except:
	print('Missing Libraries')
        exit(1)


class InterfacingWindow:
        #Constructor
        def __init__(self):
                        self.builder = Gtk.Builder()
                        self.builder.add_from_file("./interfacingwindow.ui")
                        self.builder.connect_signals(self)
		
                        self.channelbar1 = self.builder.get_object("channelbar1")
                        self.channel1 = self.builder.get_object("channel1")

                        self.channelbar2 = self.builder.get_object("channelbar2")
                        self.channel2 = self.builder.get_object("channel2")

                        self.channelbar3 = self.builder.get_object("channelbar3")
                        self.channel3 = self.builder.get_object("channel2")
                        
                        self.interfacingwindow = self.builder.get_object("interfacingwindow")
                        self.interfacingwindow.set_title("Interface")
                        
                        #Window Controls
                        self.interfacingwindow.show()

        #Initialisation Settings
        def on_devicecombobox_changed(self,*args):
                print "dcbc"
        def on_baudcombobox_changed(self,*args):
                print "bcbc"
        def on_paritycombobox_changed(self,*args):
                print "bcbc"
        def on_datacombobox_changed(self,*args):
                print "bcbc"
        def on_stopcombobox_changed(self,*args):
                print "bcbc"
        def on_channelbutton_value_changed(self, *args):
                print "cbvc"
        def on_delimiterentry_activate(self, *args):
                print "dea"

	#Main Quit
	def on_interfacingwindow_delete_event(self, *args):
        	Gtk.main_quit(*args)
        def on_cancelbutton_pressed(self,*args):
                Gtk.main_quit(*args)
        def on_cancelbutton_activate(self,*args):
                Gtk.main_quit(*args)

	#Execute Controls
	def on_openclosebutton_pressed(self,*args):
                device="/dev/ttyACM1"
                try:    
                        print "Attempting connection to",device 
                        arduino = serial.Serial(device, 9600)
                        print "Connection to",device,"succesfully established"
                except:    
                        print "Failed to connect on",device     
  
                while 1:
                        print arduino.readline()

	def on_openclosebutton_activate(self,*args):
                device="/dev/ttyACM1"
                try:    
                        print "Attempting connection to",device 
                        arduino = serial.Serial(device, 9600)
                        print "Connection to",device,"succesfully established"
                except:    
                        print "Failed to connect on",device     
  
                while 1:
                        print arduino.readline()
                        

#Execute if file run as script
if __name__ == "__main__":
        #Object Instantiation
        InterfacingWindow = InterfacingWindow()
        Gtk.main()
