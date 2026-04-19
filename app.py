from flask import Flask, render_template, redirect, request, flash, g, session, url_for, jsonify
import datetime
import sys

import json

import pprint

import flask

# from passlib.hash import sha256_cryptpip insta
import string
import random

import operator

import cPanel_db

app = Flask(__name__)

app = flask.Flask('env')

app.secret_key = 'cp07072021'

app.jinja_env.add_extension('jinja2.ext.loopcontrols')

pp = pprint.PrettyPrinter(indent=1)


# # door_sizes = {}
# global door_types
# global stamp_design
# global door_colors
# global door_windows
# global Deco_hardwares

# ------------------------------------------------------------------------------------Random id generator
def generate_id(letters_count, digits_count):
    sample_str = ""
    if(session['property_flag']):
        sample_str = session['property_flag'].upper() 
    sample_str += '-'
    sample_str += ''.join((random.choice(string.digits) for i in range(digits_count)))

    sample_list = list(sample_str)
    final_string = ''.join(sample_list)
    print('generated id ----', final_string)
    return final_string


# -------------------------------------------------------------------------------------Entry Route
@app.route('/')
def index():
    return render_template('home.html')

# -------------------------------------------------------------------------------------Entry Route
@app.route('/data_entry')
def Item_Entry():
    return redirect(url_for('show_all_options'))
# -------------------------------------------------------------------------------------Door_builder
@app.route('/create_doorModel')
def create_doorModel():
    all_models_list = []

    all_dModels = cPanel_db.get_allModels()

    for m in all_dModels:
        all_models_list.append(m)

    print('all_models_list----------------', all_models_list)
    return render_template('create_door_model.html', all_doorModels = all_models_list)



# --------------------------------------------------------------------------------------Fetch & display all features added
@app.route('/all_Models')
def show_all_options():
    all_field_data = {}

    all_width_list = []
    all_height_list = []
    all_options_list = []
    all_panels_list = []
    all_colors_list = []
    all_windows_list = []
    all_HW_LIST = []
    

    all_widths = cPanel_db.get_allWidth()
    all_heights = cPanel_db.get_allHeight()
    # all_options = cPanel_db.get_allTypes()
    # all_panels = cPanel_db.get_allPanels()
    # all_colors = cPanel_db.get_allColors()
    # all_windows = cPanel_db.get_allwindows()
    # all_hw = cPanel_db.get_allHardware()
    
    

    for s in all_widths:
        all_width_list.append(s)

    for h in all_heights:
        all_height_list.append(h)

    # for t in all_options:
    #     all_options_list.append(t)

    # for p in all_panels:
    #     all_panels_list.append(p)

    # for c in all_colors:
    #     all_colors_list.append(c)

    # for w in all_windows:
    #     all_windows_list.append(w)

    # for h in all_hw:
    #     all_HW_LIST.append(h)

    
    print(all_width_list)
    print(sorted(all_width_list, key=lambda x: x['ft']) )
    print(all_height_list)

    all_field_data['door_width'] =  sorted(all_width_list, key=lambda x: x['ft'])
    all_field_data['door_height'] = sorted(all_height_list, key=lambda x: x['ft'])
    # all_field_data['door_options'] = all_options_list, 
    # all_field_data['door_panel'] = all_panels_list, 
    # all_field_data['door_color'] = all_colors_list,
    # all_field_data['door_window'] = all_windows_list,
    # all_field_data['door_hardware'] = all_HW_LIST
    
    return render_template('add_properties.html', door_properties = all_field_data)


    
# -------------------------------------------------------------------------------------------create empty Door Model at DB

# @app.route('/_get_data/', methods=['POST'])
# def _get_data():
#     all_sizes_list = []
#     all_options_list = []

#     all_sizes = cPanel_db.get_allSizes()
#     all_options = cPanel_db.get_allTypes()

#     for s in all_sizes:
#         all_sizes_list.append(s)

#     for t in all_options:
#         all_options_list.append(t)

    

#     return jsonify({'data': render_template('response.html', myList=all_sizes_list, myOptions = all_options_list)})



@app.route('/_get_data/', methods=['POST'])
def _get_data():
    all_sizes_list = []
    all_options_list = []

    all_sizes = cPanel_db.get_allSizes()
    all_options = cPanel_db.get_allTypes()

    for s in all_sizes:
        all_sizes_list.append(s)

    for t in all_options:
        all_options_list.append(t)    

    data = {'data': {'myList': all_sizes_list, 'myOptions' : all_options_list}}

    return json.dumps(data)



def create_empty_door_model(modelName):
    models = {}

    models["model_id"] = generate_id(8,6)
    models["model_name"] = modelName
    models["size"] = {}
    models["Type"] = {}
    models["StampDesign"] = {}
    models["Color"] = {}
    models["Windows"] = {}
    models["Hardwares"] = {}

     
    cPanel_db.create_empty_doorModel(models)
    return


# -----------------------------------------------------------------------------Configure Door Odel
@app.route('/configure_door_model', methods=['POST', 'GET'])
def configure_door_model():

    model_status = {}
    
    session['width'] = ''
    session['height'] = ''
    session['types'] = ''
    session['stamp'] = ''
    session['color'] = ''
    session['windows'] = ''
    session['d_hw'] = ''

    modelName = request.form['door_model'].strip()
    if modelName:
        cursor = cPanel_db.check_model_availability(modelName)
    else:
        flash(u'Enter Door Model name', 'error')
        return redirect(url_for('create_doorModel'))   

    for c in cursor:
        model_status = c
        print(model_status)

	
    session['dModel'] = ''
    if model_status:
        flash(u'Door Model exists .. Try new one', 'danger')
        # flash('Model already created ..')
        return redirect(url_for('create_doorModel'))
    else:
        create_empty_door_model(modelName) 
        return redirect(url_for('add_model', door_model = modelName))

# ---------------------------------------------------------------------------------------Add Door Model
@app.route('/add_door_model/<door_model>')
def add_model(door_model):
    
    sizes = ""
    # -----------------------------------all lists of features
    all_widths_list = []
    all_heights_list = []
    all_sizes_list = []
    all_options_list = []
    all_panels_list = []
    all_colors_list = []
    all_windows_list = []
    all_HW_LIST = []   

    widthList = []
    heightList = []
    sizeList = []

    all_widths_default = {}
    all_heights_default = {}
    all_types_default = {}
    all_panels_default = {}
    all_colors_default = {}
    all_windows_default = {}
    all_HW_default = {}
    
    # ----------------------------------------getting all feature options from db
    all_widths = cPanel_db.get_allWidth()
    all_heights = cPanel_db.get_allHeight()
    all_options = cPanel_db.get_allTypes()
    all_panels = cPanel_db.get_allPanels()
    all_colors = cPanel_db.get_allColors()
    all_windows = cPanel_db.get_allwindows()
    all_hw = cPanel_db.get_allHardware()   
    
    # ----------------------------------------append all data to list
    for d_w in all_widths:
        all_widths_list.append(d_w)

    for d_h in all_heights:
        all_heights_list.append(d_h)

    # for widths in all_widths_list:
    #     sizes = widths['ft']+'.'+widths['inch']+'ft'
    #     widthList.append(sizes)
    
    # for heights in all_heights_list:
    #     sizes = heights['ft']+'.'+heights['inch']+'ft'
    #     heightList.append(sizes)

    for widths in all_widths_list:
        width = str(widths['ft'])+"' "+str(widths['inch'])+'"'
        print('------------------------widths', width)
        for heights in all_heights_list:
            height = str(heights['ft'])+"' "+str(heights['inch'])+'"'
            print('----------------', height)
            sizes = width + ' x ' + height
            print(sizes)
            sizeList.append(sizes)
    
    # for heights in all_heights_list:
    #     sizes = heights['ft']+'.'+heights['inch']+'ft'
    #     heightList.append(sizes)

    print('widths list and height list--------', sizeList)
    for t in all_options:
        all_options_list.append(t)

    for p in all_panels:
        all_panels_list.append(p)

    for c in all_colors:
        all_colors_list.append(c)

    for w in all_windows:
        all_windows_list.append(w)

    for h in all_hw:
        all_HW_LIST.append(h)
    
    # create_empty_door_model(door_model)    
    
    return render_template('doorModel_config.html', dModel = door_model,
                                                    dsizes = sizeList,
                                                    dOptions = all_options_list,
                                                    dPanels = all_panels_list,
                                                    dColors = all_colors_list,
                                                    dWindows = all_windows_list,
                                                    dHw = all_HW_LIST)



# -----------------------------------------------------------------------------------------Delete a Door Model
@app.route('/delete_door_model/<modelName>', methods=['POST'])
def delete_model(modelName):
    msg = cPanel_db.deleteModel(modelName)
    print(msg)

    return redirect(url_for('create_doorModel'))

@app.route('/edit_door_model/<modelName>', methods=['POST'])
def edit_door_model(modelName):
    return redirect(url_for('add_model', door_model = modelName))

# ----------------------------------------------------------------------------------------Add Sizes
# @app.route('/add_sizes', methods=['POST'])
# def add_width_height():
#     width_height = {}

#     wdth = request.form['door_width'].strip()
#     hght = request.form['door_height'].strip()

#     width_height['size_id'] = generate_id(7, 6, 'd_size')
#     width_height['d_width'] = wdth
#     width_height['d_height'] = hght

#     result = cPanel_db.save_d_sizes(width_height)
#     print(result)
#     print(width_height)

#     return redirect(url_for('show_all_options'))

@app.route('/add_sizes', methods=['POST'])
def add_widthHeight():
    return redirect(url_for('show_all_options'))




@app.route('/add_w_h/<w>/<h>', methods=['POST'])
def add_width_height(w, h):
    width_height = {}

    width_height['size_id'] = generate_id(7, 6, 'd_size')
    width_height['d_width'] = w
    width_height['d_height'] = h
    result = cPanel_db.save_d_sizes(width_height)
    return jsonify(result)


# ---------------------------------------------------------------------------------------Delete Door Size

@app.route('/delete_door_size/<size_id>', methods=['POST'])
def delete_dSize(size_id):
    print('app' + size_id)
    msg = cPanel_db.deleteSize(size_id)
    print(msg)

    return redirect(url_for('show_all_options'))


@app.route('/add_width/<size>', methods=['POST'])
def add_width(size):
    session['property_flag'] = size

    print(session['property_flag'])
    door_width = {}
    if(size=='d-width'):
        width_ft = (int)(request.form['width_ft'])
        width_inch = (int)(request.form['width_inch'])
    else: 
        width_ft = (int)(request.form['height_ft'])
        width_inch = (int)(request.form['height_inch'])
    
    door_width[session['property_flag']+'-id'] = generate_id(len(session['property_flag']), 6)
    door_width['ft'] = width_ft
    door_width['inch'] = width_inch

    print(door_width)

    if(size == 'd-width'):
        cPanel_db.save_d_width(door_width)   
    else:
        cPanel_db.save_d_height(door_width)   
    
    return redirect(url_for('Item_Entry'))

# ----------------------------------------------------------------------------------------Add Door type
@app.route('/add_type', methods=['POST'])
def add_door_option():
    door_option = {}

    d_option = request.form['d_type'].strip()

    door_option['doorType_id'] = generate_id(7, 6, 'd_type')
    door_option['door_type'] = d_option

    result = cPanel_db.save_d_types(door_option)
    print(result)
    print(door_option)

    return redirect(url_for('show_all_options'))




# ---------------------------------------------------------------------------------------Delete Door type

@app.route('/delete_door_type/<type_id>', methods=['POST'])
def delete_dType(type_id):
    print('app' + type_id)
    msg = cPanel_db.deleteType(type_id)
    print(msg)

    return redirect(url_for('show_all_options'))

# ----------------------------------------------------------------------------------------Add Door panel
@app.route('/add_panels', methods=['POST'])
def add_door_panels():
    door_panels = {}

    d_panel = request.form['d_panel'].strip()

    door_panels['doorPanel_id'] = generate_id(7, 6, 'd_panel')
    door_panels['door_panel'] = d_panel

    result = cPanel_db.save_panels(door_panels)

    return redirect(url_for('show_all_options'))

# -----------------------------------------------------------------------------------Delete Door Panel

@app.route('/delete_door_panel/<panel_id>', methods=['POST'])
def delete_dPanel(panel_id):
    msg = cPanel_db.deletePanel(panel_id)
    print(msg)

    return redirect(url_for('show_all_options'))


# ----------------------------------------------------------------------------------------Add Door Color
@app.route('/add_color', methods=['POST'])
def add_door_colors():
    door_colors = {}

    dColor = request.form['d_color'].strip()

    door_colors['doorColor_id'] = generate_id(6, 6, 'd_color')
    door_colors['door_color'] = dColor

    result = cPanel_db.save_colors(door_colors)

    return redirect(url_for('show_all_options'))

# -----------------------------------------------------------------------------------Delete Door Color

@app.route('/delete_color/<color_id>', methods=['POST'])
def delete_dColor(color_id):
    msg = cPanel_db.deleteColor(color_id)
    print(msg)

    return redirect(url_for('show_all_options'))

# ----------------------------------------------------------------------------------------Add Window
@app.route('/add_window', methods=['POST'])
def add_door_window():
    dWindows = {}

    d_window = request.form['door_win'].strip()

    dWindows['window_id'] = generate_id(7, 6, 'd_window')
    dWindows['door_window'] = d_window

    result = cPanel_db.save_window(dWindows)

    return redirect(url_for('show_all_options'))

# -----------------------------------------------------------------------------------Delete Door windows

@app.route('/delete_window/<win_id>', methods=['POST'])
def delete_dWindow(win_id):
    msg = cPanel_db.deleteWindow(win_id)
    print(msg)

    return redirect(url_for('show_all_options'))


# ----------------------------------------------------------------------------------------Add Hardware
@app.route('/add_hardware', methods=['POST'])
def add_door_hardware():
    dHardware = {}

    d_hw = request.form['deca_hw'].strip()

    dHardware['hw_id'] = generate_id(7, 6, 'd_hw')
    dHardware['deco_hardware'] = d_hw

    result = cPanel_db.save_hw(dHardware)

    return redirect(url_for('show_all_options'))

# -----------------------------------------------------------------------------------Delete Door Color

@app.route('/delete_hw/<hw_id>', methods=['POST'])
def delete_dHw(hw_id):
    msg = cPanel_db.deleteHw(hw_id)
    print(msg)

    return redirect(url_for('show_all_options'))




@app.route('/save_activated_sizes/<modelName>/<features>', methods=['POST'])
def get_activated_sizes(modelName, features):
    print('get sizes:-------------------')
    door_sizes = {}
    door_types = {}
    stamp_design = {}
    door_colors = {}
    door_windows = {}
    Deco_hardwares ={}
    
    f = request.form
    print('grabbed from request.form -----',f)
    for key in f.keys():
        for value in f.getlist(key):
            print(key,":",value)        
        if(features == '1'):
            door_sizes[key] = value
            print('------------------------')
            session['size'] = door_sizes
            print(session['size'])
        elif(features == '2'):
            door_types[key] = value
            print('------------------------')
            session['types'] = door_types        
            print(session['types'])
        elif(features == '3'):
            stamp_design[key] = value
            print('------------------------')
            session['stamp'] = stamp_design        
            print(session['stamp']) 
        elif(features == '4'):
            door_colors[key] = value
            print('------------------------')
            session['color'] = door_colors        
            print(session['color']) 
        elif(features == '5'):
            door_windows[key] = value
            print('------------------------')
            session['windows'] = door_windows        
            print(session['windows']) 
        elif(features == '6'):
            Deco_hardwares[key] = value
            print('------------------------')
            session['d_hw'] = Deco_hardwares        
            print(session['d_hw'])
        else:
            print('Wrong option')
        
    
    
    
    
    return redirect(url_for('add_model', door_model = modelName))

# print(door_sizes)

@app.route('/update_options/<dModel>')
def update_options(dModel):

    doorModel_info = {}

    print('---------------------------selected features for' + dModel)
    print(session['size'])
    print(session['types'])
    print(session['stamp'])
    print(session['color'])
    print(session['windows'])
    print(session['d_hw'])

    
    # session['size'] = {}
    # session['types'] = {}
    # session['stamp'] = {}
    # session['color'] = {}
    # session['windows'] = {}
    # session['d_hw'] = {}

    cPanel_db.update_doorModel(dModel)

    # print(result)
    
    # flash(u '', 'success')

    return redirect(url_for('create_doorModel'))



if __name__ == '__main__':
  app.run(debug=True)