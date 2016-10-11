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
from ftp_server import *
from http_server import *

import subprocess, sys, os, socket

def knode_start():
    os.chdir('kippo')
    subprocess.call(['./pystart.sh'])
    os.chdir('..')

def main():
    http_thread = http_ctrl()
    http_thread.setDaemon(True)

    ftp_thread = ftp_ctrl()
    ftp_thread.setDaemon(True)
    
    http_thread.start()
    ftp_thread.start()

    while 1:
        if sys.stdin == "exit":
            http_thread.stop()
            ftp_thread.ftp_stop()
            break


if __name__ == "__main__":
    main()

