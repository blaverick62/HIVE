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
from SIREN_SERVERS import *

import subprocess, sys, os, socket

def knode_start():
    os.chdir('kippo')
    subprocess.call(['./pystart.sh'])
    os.chdir('..')

def main():
    http_thread = http_ctrl()
    ftp_thread = ftp_ctrl()
    httpth = http_thread.http_bind()
    httpth.start()
    ftpth = ftp_thread.run()
    ftpth.start()

while 1:
    pass

if __name__ == "__main__":
    main()

