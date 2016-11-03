#############################################################
# NAME: C1C Braden J Laverick                               #
# PROJECT: SIREN Project                                    #
# FILE: SIREN Server Classes - det_routes.py                #
# DESCRIPTION:                                              #
# This file defines the detonation chamber object for SIREN #
# and takes user input to specify the IP addresses of each  #
# chamber.                                                  #
#############################################################

import socket

class detChamber():
    """
        Object for detonation chamber
    """

    def __init__(self, addr):
        self.addr = addr
        self.httpsock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        print("Connecting to Chamber %s HTTP Port 80..." % addr)
        self.httpconn = self.httpsock.connect(addr, 1234)
        self.ftpsock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        print("Connecting to Chamber %s FTP Port 21..." % addr)
        self.ftpconn = self.ftpsock.connect(addr, 21)
        self.telsock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        print("Connection to Chamber %s Telnet Port 23..." % addr)
        self.telconn = self.telsock.connect(addr, 23)

    def det_close(self):
        self.httpsock.close()
        self.ftpsock.close()
        self.telsock.close()


