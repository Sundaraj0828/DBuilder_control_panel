from pymongo import MongoClient
from flask import session
import datetime
import sys

import pymongo

import flask



# # from bson.objectid import ObjectId

from configparser import ConfigParser
import configparser

config = configparser.ConfigParser()
config.read('config.ini')

global con
global db
global model_col
global size_col
global width_col
global type_col
global panel_col
global color_col
global win_col
global hw_col

def connect_db():
  global con
  global db
  global model_col
  global size_col
  global width_col
  global height_col
  global type_col
  global panel_col
  global color_col
  global win_col
  global hw_col

  con = MongoClient('mongodb+srv://Sourav:l9EG8ULwylphgjHS@nexusfieldservice.axvp7.mongodb.net/cPanel_db?ssl=true&ssl_cert_reqs=CERT_NONE&retryWrites=true&w=majority')
  db = con.cPanel_db
  model_col = db.door_model
  size_col = db.door_sizes
  width_col = db.door_width
  height_col = db.door_height
  type_col = db.door_type
  panel_col = db.door_panel
  color_col = db.door_color
  win_col = db.door_window
  hw_col = db.deco_hardware

# -----------------------------------------models





def get_allModels():
  global model_col
  connect_db()
  allDoorModels = model_col.find({}, {'model_name':1})
  return allDoorModels

def create_empty_doorModel(models):
  global model_col
  connect_db()
  print('before save')
  model_col.insert(models)
  return "successfully added"

def deleteModel(modelName):
  global model_col
  connect_db()
  model_col.remove({"model_name": str(modelName)})
  return "successfully deleted"

# ----------------------------------------------sizes

def get_allWidth():
  global width_col
  connect_db()
  all_widths = width_col.find({}, {'_id':0})
  return all_widths

def get_allHeight():
  global height_col
  connect_db()
  all_heights = height_col.find({}, {'_id':0})
  return all_heights

def save_d_sizes(w_n_h):
  global size_col
  connect_db()
  if(session['property_flag']=='d_width'):
    width_col.insert(w_n_h)
  else:
    height_col.insert(w_n_h)
  return "successfully added"

def save_d_width(door_width):
  global width_col
  connect_db()
  width_col.insert(door_width)  
  return "successfull"

def save_d_height(door_width):
  global height_col
  connect_db()
  height_col.insert(door_width)  
  return "successfull"

def deleteSize(sizeId):
  global size_col
  print('db'+sizeId)
  connect_db()
  size_col.remove({"size_id": str(sizeId)})
  return "successfully deleted"


# ----------------------------------------------Types

def get_allTypes():
  global type_col
  connect_db()
  all_types = type_col.find({}, {'_id':0})
  return all_types

def save_d_types(d_opt):
  global type_col
  connect_db()
  type_col.insert(d_opt)
  return "successfully added"

def deleteType(typeId):
  global type_col
  print('db'+typeId)
  connect_db()
  type_col.remove({"doorType_id": str(typeId)})
  return "successfully deleted"


# ---------------------------------------------------Panels

def get_allPanels():
  global panel_col
  connect_db()
  all_panels = panel_col.find({}, {'_id':0})
  return all_panels

def save_panels(d_panels):
  global panel_col
  connect_db()
  panel_col.insert(d_panels)
  return "successfully added"

def deletePanel(panelId):
  global panel_col
  connect_db()
  panel_col.remove({"doorPanel_id": str(panelId)})
  return "successfully deleted"


# ---------------------------------------------------Panels

def get_allColors():
  global color_col
  connect_db()
  all_colors = color_col.find({}, {'_id':0})
  return all_colors

def save_colors(d_colors):
  global color_col
  connect_db()
  color_col.insert(d_colors)
  return "successfully added"

def deleteColor(colorId):
  global color_col
  connect_db()
  color_col.remove({"doorColor_id": str(colorId)})
  return "successfully deleted"



  
  # ---------------------------------------------------windows

def get_allwindows():
  global win_col
  connect_db()
  all_windows = win_col.find({}, {'_id':0})
  return all_windows

def save_window(d_windows):
  global win_col
  connect_db()
  win_col.insert(d_windows)
  return "successfully added"

def deleteWindow(winId):
  global win_col
  connect_db()
  win_col.remove({"window_id": str(winId)})
  return "successfully deleted"


  

    # ---------------------------------------------------hardware

def get_allHardware():
  global hw_col
  connect_db()
  all_hw = hw_col.find({}, {'_id':0})
  return all_hw

def save_hw(d_hw):
  global hw_col
  connect_db()
  hw_col.insert(d_hw)
  return "successfully added"

def deleteWindow(hwId):
  global hw_col
  connect_db()
  hw_col.remove({"hw_id": str(hwId)})
  return "successfully deleted"


# def save_sizes_with_default_value(all_sizes_default)

def check_model_availability(modelName):
  global model_col
  connect_db()
  model_available = model_col.find({'model_name':str(modelName)}, {'model_name':1, '_id':0})
  return model_available

def update_doorModel(dModel):
  global model_col
  connect_db()
  print('------------------------db data', dModel ,session['size'])
  return model_col.update_one({'model_name': str(dModel)}, {'$set' : {'size': session['size'], 'Type': session['types'], 'StampDesign': session['stamp'], 'Color':session['color'], 'Windows': session['windows'], 'Hardwares':session['d_hw']  }})
  