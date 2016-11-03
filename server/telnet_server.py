#############################################################
# NAME: C1C Braden J Laverick                               #
# PROJECT: SIREN Project                                    #
# FILE: SIREN Server Classes - telnet_server.py             #
# DESCRIPTION:                                              #
# This file specifies the classes for the various control   #
# servers that SIREN implements.                            #
#############################################################

import socket, threading, sys
from base import base

class telnetServerThread(threading.Thread):
    def __init__(self,(conn,addr)):
        self.conn=conn
        self.addr=addr
        threading.Thread.__init__(self)

    def run(self):

        while True:
            data = self.conn.recv(256)
            print(data)
            self.conn.send(b'Message received fam!\r\n')


class telnet_ctrl(base, threading.Thread):
    """
        Control server for the HTTP Protocol server
    """
    def __init__(self):
        self.port = 2023
        self.buff = 4096
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            print("Starting Telnet Server...")
            self.sock.bind((socket.gethostname(), self.port))
        except Exception as e:
            print("Telnet Server failed to bind to port...")
            sys.exit()

        threading.Thread.__init__(self)
        base.__init__(self, winDet=super, linDet=super)

    def run(self):
        self.sock.listen(5)
        while 1:
            th = telnetServerThread(self.sock.accept())
            th.start()
            pass

    def stop(self):
        self.sock.close()