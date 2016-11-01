#############################################################
# NAME: C1C Braden J Laverick                               #
# PROJECT: SIREN Project                                    #
# FILE: SIREN Control Module - SIREN_CTRL.py                #
# DESCRIPTION:                                              #
# This file is the control module for the SIREN project.    #
# The program will take in commands from the adversary on   #
# protocol listeners and route them to the appropriate VMs. #
# The module is also equipped with logging, data acqusition,#
# and can record data on the attacker.                      #
#############################################################

import threading
from server.ftp_server import *
from server.http_server import *
from server.telnet_server import *
from detonation import detChamber

import subprocess, sys, os, socket

# Clean up kippo exit
def knode_start():
    os.chdir('kippo')
    print("Starting Kippo Honeypot...")
    kipStart = "twistd -y kippo.tac -l log/kippo.log --pidfile kippo.pid"
    subprocess.Popen(kipStart.split())
    os.chdir('..')
    print("Kippo Running in Background...")

def knode_stop():
    os.chdir('kippo')
    subprocess.call(['./stop.sh'])
    os.chdir('..')

def main():
    dets = -1

    while (dets < 0):
        dets = input("How many detonation chambers would you like to connect? >> ")

    linList = []
    winList = []

    if (dets > 0):
        for i in range(dets):
            detaddr = input("What is the IP Address of this chamber? >>")
            dettype = input("What type is this detonation chamber? Y for Linux/OSX or N for Windows >>").upper()

            if (dettype == 'Y'):
                dettype = True
            else:
                dettype = False

            if (dettype == True):
                linList.append(detaddr)
            else:
                winList.append(detaddr)

    # http_thread = http_ctrl()
    # http_thread.setDaemon(True)

    # ftp_thread = ftp_ctrl()
    # ftp_thread.setDaemon(True)

    #telnet_thread = telnet_ctrl()
    #telnet_thread.setDaemon(True)

    try:
        knode_start()
        # http_thread.start()
        # ftp_thread.start()
        #telnet_thread.start()
    except KeyboardInterrupt:
        # http_thread.stop()
        # ftp_thread.stop()
        #telnet_thread.stop()
        #knode_stop()
        sys.exit()


    while 1:
        if sys.stdin == "exit":
            #http_thread.stop()
            #ftp_thread.stop()
            #telnet_thread.stop()
            #knode_stop()
            break


if __name__ == "__main__":
    main()

