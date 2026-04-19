// ==============================Window panel filter======================================

$(document).ready(function(){
    $("#shortPanels").hide();
    $('#longPanels').hide();
    $('#sp_decraglasses').hide();
    $('#lp_decraglasses').hide();
    
    $('#w_row').hide();

    $('#Handles').hide();
    $('#Strap').hide();
    $('#lock').hide();


    $('#panels').change(function(){
        var panel_value = $(this).children('option:selected').val();
        console.log("You have selected the panel - " + panel_value);

        //----------------------------------Windows selection based on panel
        if(panel_value == 'Short'){
            $("#shortPanels").show();
            $('#sp_decraglasses').show();
            $("#longPanels").hide();
            $('#lp_decraglasses').hide();
        
        }
        else if((panel_value == 'recessed')||(panel_value=='raised')||(panel_value=='Long')||(panel_value=='beadboard')||(panel_value=='l_beadboard')){
            $("#shortPanels").hide();
            $('#sp_decraglasses').hide();
            $('#longPanels').show();
            $('#lp_decraglasses').show();
        
        }
        else if(panel_value == ''){
            console.log('empty');
            $("#shortPanels").hide();
            $('#longPanels').hide();
        }

        // ---------------------------------------Hardware selecton based on Panel
        if((panel_value == 'recessed')||(panel_value=='raised')||(panel_value=='beadboard')||(panel_value=='l_beadboard')){
            $('#Handles').show();
            $('#Strap').show();
            $('#lock').hide();
        }
        else if((panel_value == 'Short')||(panel_value=='Long')){
            $('#Handles').hide();
            $('#Strap').hide();
            $('#lock').show();
        }
        else{
            $('#Handles').hide();
            $('#Strap').hide();
            $('#lock').hide();
        }
    
    });

    // function get_a(){
    //     return '10';
    // }

    $('#window').change(function(){
        var win_value = $(this).children('option:selected').val();
        console.log("You have selected the window - " + win_value);

        if(win_value != ''){
        $('#w_row').show();
        }
    })
});

// =================================================================================================
//                                              Canvas 
// =================================================================================================

function draw(){     
    console.log('drawing started');
    var canvas = document.getElementById("door");
    
    // ------------------------------ canvas context
    var ctx =canvas.getContext("2d");   

    // var w_ft = 8;
    // var h_ft = 7;

    var w_ft = document.getElementById("door_w").value;
    var h_ft = document.getElementById("door_h").value;
    
    selectedPanel = document.getElementById('panels').value;

    if(selectedPanel == 'Short'){
        var p_w = 21.000

        if(w_ft % 2 == 0){
            if(w_ft == 14){
                var panel_c = (w_ft-2)/2        
            }
            else{
                var panel_c = w_ft/2    
            }
        }
        else{            
            if(w_ft == 15){
                var panel_c = (w_ft-3)/2        
            }
            else{
                var panel_c = (w_ft-1)/2
            }
        } 
    }
    else if(selectedPanel == 'Long'){
        var p_w = 41.000

        if(w_ft < 12){
            var panel_c = 2;    
        }
        else if(w_ft == 12 || w_ft == 14){
            var panel_c = 3
        }
        else if(w_ft >= 15 && w_ft <= 18 ){
            var panel_c = 4
        } 
        else if(w_ft == 20){
            var panel_c = 5
        }
    }
    
    var p_h = 13.500
    var b_e = 2.830
    
    console.log('panel count -----------', panel_c)    
    // -------------------------------------Height calculation
    if(h_ft == 6){
        var s_h_18 = 18
        var s_h_21 = ''
        var r_h_18 = 2.250

        var panel_r = 4
    }
    else if(h_ft == 6.3 || h_ft == 6.6 || h_ft == 6.9){
        var s_h_18 = 18
        var s_h_21 = 21
        var r_h_21 = 3.750
        var r_h_18 = 2.250

        var panel_r = 4
    }    
    else if(h_ft == '7'){
        var s_h_18 = ''
        var s_h_21 = 21
        var r_h_21 = 3.750

        var panel_r = 4
    }       
    else if(h_ft == '7.6'){
        var s_h_18 = 18
        var s_h_21 = ''
        var r_h_18 = 2.250

        var panel_r = 5
    }
    else if(h_ft == '7.9'){
        var s_h_18 = 18
        var s_h_21 = 21
        var r_h_18 = 2.250
        var r_h_21 = 3.750

        var panel_r = 5
    }
    else if(h_ft == '8' || h_ft == '8.3' || h_ft == 8.6 || h_ft == 8.9){
        var s_h_18 = 18
        var s_h_21 = 21
        var r_h_18 = 2.250
        var r_h_21 = 3.750

        var panel_r = 5
    }
    else if(h_ft == '9'){
        var s_h_18 = 18
        var s_h_21 = ''
        var r_h_18 = 2.250

        var panel_r = 6
    }
    else if(h_ft == 9.3 || h_ft == 9.6 || h_ft == 9.9){        
        var s_h_18 = 18
        var s_h_21 = 21
        var r_h_18 = 2.250
        var r_h_21 = 3.750

        var panel_r = 6
    }
    else if(h_ft == '10' || h_ft == 10.3 || h_ft ==10.9){        
        var s_h_18 = 18
        var s_h_21 = 21
        var r_h_18 = 2.250
        var r_h_21 = 3.750

        if(h_ft == 10.9){
            var panel_r = 7    
        }
        else{
            var panel_r = 6
        }
    }
    else if(h_ft == '10.6'){
        var s_h_18 = ''
        var s_h_21 = 21
        var r_h_21 = 3.750

        var panel_r = 6
    }
    else if(h_ft == '11' || h_ft==11.3 || h_ft == 11.6 || h_ft == 11.9 || h_ft == '12'){        
        var s_h_18 = 18
        var s_h_21 = 21
        var r_h_18 = 2.250
        var r_h_21 = 3.750

        var panel_r = 7
    }
    

    // -------------------------------------width calculation

    if(w_ft == '8'){
        
        var w = 800;
        var h = w*(h_ft/w_ft);  

        var panel_count = panel_c

        if(selectedPanel == 'Short'){
            var e_s_spacing = 2.684
            var c_spacing = 2.188
        }
        else if(selectedPanel == 'Long'){
            var e_s_spacing = 4.766
            var c_spacing = 4.440
        }

        
    }
    else if (w_ft == '9'){
        var w = 800;
        var h = w*(h_ft/w_ft);
        
        var panel_count = panel_c
        
        if(selectedPanel == 'Short'){
            var e_s_spacing = 5.404
            var c_spacing = 4.375
        }
        else if(selectedPanel == 'Long'){
            var e_s_spacing = 9.636
            var c_spacing = 6.660
        }

    }
    else if (w_ft == '10'){
        var w = 900;
        var h = w*(h_ft/w_ft);
        
        var panel_count = panel_c

        if(selectedPanel == 'Short'){
            var e_s_spacing = 3.090
            var c_spacing = 2.188
        }
        else if(selectedPanel == 'Long'){
            var e_s_spacing = 14.636
            var c_spacing = 10.660
        }

    }
    else if (w_ft == '12'){
        var w = 900;
        var h = w*(h_ft/w_ft);
        
        var panel_count = panel_c

        if(selectedPanel == 'Short'){
            var e_s_spacing = 3.496
            var c_spacing = 2.188
        }
        else if(selectedPanel == 'Long'){
            var e_s_spacing = 6.716
            var c_spacing = 3.75
        }
    }
    else if (w_ft == '14'){
        var w = 900;
        var h = w*(h_ft/w_ft);
        
        var panel_count = panel_c

        if(selectedPanel == 'Short'){
            var e_s_spacing = 8
            var c_spacing = 5.175
        }
        else if(selectedPanel == 'Long'){
            var e_s_spacing = 12.716
            var c_spacing = 9.75
        }
    }
    else if (w_ft == '15'){
        var w = 900;
        var h = w*(h_ft/w_ft);
        
        var panel_count = panel_c

        if(selectedPanel == 'Short'){
            var e_s_spacing = 9.438
            var c_spacing = 7.000
        }
        else if(selectedPanel == 'Long'){
            var e_s_spacing = 4.366
            var c_spacing = 2.400
        }
    }
    else if(w_ft == '16'){        
        var w = 900;
        var h = w*(h_ft/w_ft);
        
        var panel_count = panel_c
    
        
        if(selectedPanel == 'Short'){
            var e_s_spacing = 4.308
            var c_spacing = 2.188   
        }
        else if(selectedPanel == 'Long'){
            var e_s_spacing = 7.366
            var c_spacing = 4.400
        }
    }
    else if(w_ft == '17'){        
        var w = 900;
        var h = w*(h_ft/w_ft);
        
        var panel_count = panel_c
    
        
        if(selectedPanel == 'Short'){
            var e_s_spacing = 6.311
            var c_spacing = 3.330  
        }
        else if(selectedPanel == 'Long'){
            var e_s_spacing = 9.766
            var c_spacing = 6.800
        }
    }
    else if(w_ft == '18'){        
        var w = 900;
        var h = w*(h_ft/w_ft);
        
        

        if(selectedPanel == 'Short'){
            var panel_count = panel_c-1

            var e_s_spacing = 8.654
            var c_spacing = 4.375
        }
        else if(selectedPanel == 'Long'){
            var panel_count = panel_c

            var e_s_spacing = 12.166
            var c_spacing = 9.200
        }
    }
    else if(w_ft == '20'){        
        var w = 900;
        var h = w*(h_ft/w_ft);
        
        var panel_count = panel_c
    
        

        if(selectedPanel == 'Short'){
            var e_s_spacing = 4.328
            var c_spacing = 2.364
        }
        else if(selectedPanel == 'Long'){
            var e_s_spacing = 7.800
            var c_spacing = 4.833
        }
    }

    

    // ------------------------------------------get px value
    var panel_width = get_panel_size(w_ft, h_ft, p_w)
    var panel_height = get_panel_size(w_ft, h_ft, p_h)
    var beveled_edge = get_panel_size(w_ft, h_ft, b_e)

    var section_height_18 = get_panel_size(w_ft, h_ft, s_h_18)
    var section_height_21 = get_panel_size(w_ft, h_ft, s_h_21)
    var rail_height_18 = get_panel_size(w_ft, h_ft, r_h_18)
    var rail_height_21 = get_panel_size(w_ft, h_ft, r_h_21)
    
    var end_stl_spacing = get_panel_size(w_ft, h_ft, e_s_spacing)
    var c_stl_spacing = get_panel_size(w_ft, h_ft, c_spacing)
    
    console.log("door size in ft: ", w_ft,"*", h_ft)
    console.log("door size in px: ", w,"*", h)
    console.log('---------------------------------------- ')
    console.log('panel width - ', panel_width)
    console.log('panel height - ', panel_height)
    console.log('panel beveled edge - ', beveled_edge)
    console.log('---------------------------------------- ')
    if(section_height_18){
        console.log('Section height 18" - ', section_height_18)
    }
    if(section_height_21){
        console.log('Section height 21" - ', section_height_21)
    }
    if(rail_height_18){
        console.log('Rail height 18- ', rail_height_18)
    }
    if(rail_height_21){
        console.log('Rail height 21- ', rail_height_21)
    }
    console.log('End stile Spacing - ', end_stl_spacing)
    console.log('Center Spacing - ', c_stl_spacing)
    console.log('---------------------------------------- ')
    console.log('Panel count - ', panel_count)
    
   

    // ---------------------------Panel sizes
    function convert_in_ft(p_w){
        var p_w_ft = (p_w/12)
        return p_w_ft
    }
    function get_panel_px(p_w_ft){        
        var p_px = w*(p_w_ft/w_ft);
        return p_px
    }

    // --------------------------------------------- function for getting sizes
    function get_panel_size(w, h, p_w){
        console.log('----------------------------------------- generate pixel value from inch')
        console.log('w--',w,'h----', h,'p_w---', p_w)
        var panel_w_ft = convert_in_ft(p_w)
        console.log('1----', panel_w_ft)
        var panel_px = get_panel_px(panel_w_ft)
        console.log('-----2', panel_px)
        
        return panel_px
    }
    
    

    

    // -------------------------- window sizes
    canvas.width = w;
    canvas.height = h+8;

    // ----------------------------------------get dropdown values
    
    
    selectedWindow = document.getElementById('window').value;
    windowRow = document.getElementById('win_row').value;
    // selectedColor = document.getElementById('colors').value;

    selectedHardware = document.getElementById('hardware').value;
    hwGroup = document.querySelector('select[name="hardware"] option:checked').parentElement.label;


    
    console.log('Selected Panel --------------------------------------',selectedPanel)

    

    

    //

    var pic1;
    var pic2;

    var strap1;
    var strap2;

    var strap3;
    var strap4;
    
    // ---------------------------------- base color codes

    var door_clr1 = document.getElementById("clr1"); 
    if(door_clr1){   
        console.log(door_clr1)
        door_clr1.addEventListener("click", myColor);
    }

    // var door_clr2 = document.getElementById("clr2");
    // door_clr2 = addEventListener("click", myColor);
    
    function myColor(){
        console.log('color - ', this.value)
    }
    
    


    var base_color = '#422B19';

    // ----------------------------------------- highligt & shadows
    
    lighter1 = LightenDarkenColor(base_color,13);
    lighter2 = LightenDarkenColor(base_color,25);

    // if(selectedColor == 'black'){
    //     darker1 = LightenDarkenColor(base_color,-5);
    //     darker2 = LightenDarkenColor(base_color,-50);
    // }
    // else{
    //     darker1 = LightenDarkenColor(base_color,-11);
    //     darker2 = LightenDarkenColor(base_color,-24);
    // }
    

    // color_darker_1 = (darker1);   
    // color_darker_2 = (darker2); 
    color_darker_1 = (lighter1);   
    color_darker_2 = (lighter2); 
    color_lighter_1 = (lighter1);   
    color_lighter_2 = (lighter2);   
     

    var divider_clr1 = lighter2;
    var divider_clr2 = lighter2;

   
    // function win_grad_l0(x,y){
    //     win_grad = ctx.createLinearGradient(x+60, y+70, x+140, y+100);
    // }
    // var win_grad_l0 = ctx.createLinearGradient(60, 70, 140, 100);
    // var win_grad_l1 = ctx.createLinearGradient(260, 70, 340, 100);

    // var win_grad_r0 = ctx.createLinearGradient(460, 70, 540, 100);
    // var win_grad_r1 = ctx.createLinearGradient(660, 70, 740, 100);

    // var win_grad_l = ctx.createRadialGradient(200,15,20,200,10,140);
    // var win_grad_r = ctx.createRadialGradient(620,170,40,600,180,140);
   

    function rad_grad(x, y, w, h, count){
        if(selectedPanel == 'Short'){
            if(selectedWindow == 'shortPanel_sunray' || selectedWindow == 'sp_cascade' || selectedWindow =='sp_stockton' || selectedWindow == 'sp_prairie' || selectedWindow == 'sp_cascade' || selectedWindow == 'sp_waterford' || selectedWindow == 'sp_cathedral' || selectedWindow =='sp_wagonWheel'){
                if(count==0 || count==1){
                    win_grad = ctx.createRadialGradient(200,15,20,200,10,140);
                }
                else if(count==2 || count==3){
                    win_grad = ctx.createRadialGradient(620,170,40,600,180,140);
                }      
                else{
                    console.log('not a valid window');
                }
            }
            else if(selectedWindow == 'sp_darkTint' || selectedWindow =='sp_frost' || selectedWindow == 'sp_clear'){
                if(count==0){
                    var win_grad = ctx.createLinearGradient(x+30, 70, x+100, 100);    
                }
                else if(count==1){
                    var win_grad = ctx.createLinearGradient(x+30, 70, x+100, 100);
                }
                else if(count==2){
                    var win_grad = ctx.createLinearGradient(x+30, 70, x+100, 100);
                }
                else if(count==3){
                    var win_grad = ctx.createLinearGradient(x+30, 70, x+100, 100);
                }            
            }
            else{
                if(count==0 || count==1){
                    win_grad = ctx.createRadialGradient(200,15,20,200,10,140);
                }
                else if(count==2 || count==3){
                    win_grad = ctx.createRadialGradient(620,170,40,600,180,140);
                }      
                else{
                    console.log('not a valid window');
                }
            }
        }
        
        else if(selectedPanel != 'Short'){
            if(count==0){
                var win_grad = ctx.createRadialGradient(x+160,y+10,20,x+160,y+10,140);
            }
            else if(count==1){
                var win_grad = ctx.createRadialGradient(x+180,y+130,40,x+160,y+130,140);
            }        
            else{
                console.log('not a valid window');
            }
        }

        if(selectedWindow == 'dark_tint' || selectedWindow == 'sp_darkTint'){
            win_grad.addColorStop(0,"rgb(28, 28, 23)");
            win_grad.addColorStop(.6,"rgb(57, 57, 45)");
            win_grad.addColorStop(1,"rgb(28, 28, 23)");
        }
        else if(selectedWindow == 'lp_frost' || selectedWindow == 'sp_frost' ){
            win_grad.addColorStop(0,"rgb(220, 221, 215)");
            win_grad.addColorStop(.6,"rgb(232, 232, 227)");
            win_grad.addColorStop(1,"rgb(220, 221, 215)");
        }
        else if(selectedWindow == ''){
            win_grad.addColorStop(0,"rgb(128, 197, 239)");
            win_grad.addColorStop(.9,"rgb(74, 90, 127)");
        }
        else{
            win_grad.addColorStop(0,"rgb(128, 197, 239)");
            win_grad.addColorStop(.9,"rgb(74, 90, 127)");
        }
        ctx.fillStyle = win_grad;
    }

    
    // ------------------------------------------------------ color shade calculation
    function LightenDarkenColor(col,amt) {
        var usePound = false;
        if ( col[0] == "#" ) {
            col = col.slice(1);
            usePound = true;
        }
    
        var num = parseInt(col,16);
    
        var r = (num >> 16) + amt;
    
        if ( r > 255 ) r = 255;
        else if  (r < 0) r = 0;
    
        var b = ((num >> 8) & 0x00FF) + amt;
    
        if ( b > 255 ) b = 255;
        else if  (b < 0) b = 0;
    
        var g = (num & 0x0000FF) + amt;
    
        if ( g > 255 ) g = 255;
        else if  ( g < 0 ) g = 0;
    
        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
    }
    
    

    // create door area by calling door() 
    door_area();

    // door_area------------------------------------------------------------
    function door_area(){
        ctx.fillStyle = base_color; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);        

        door_divider();

        // stamp_area();

        bottom_line();
    }


     //bottom line ----------------------------------------------------------
     function bottom_line(){
        ctx.beginPath();
        ctx.lineWidth = 8;
        ctx.strokeStyle = 'black';
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(canvas.width, canvas.height);   
        ctx.stroke();
    }

    

    

    // -------------------------------------------------------Function for Door Divider
    function door_divider(){        
        var s_hght =0;
        for(i = 0; i<panel_r; i++){                  
            console.log('s_height', s_hght);

            if(h_ft == '6'){
                r_height = rail_height_18
            }
            else if(h_ft == '6.3'){
                if(i==(panel_r-1)){
                    r_height = rail_height_21
                }
                else{
                    r_height = rail_height_18
                }
            }
            else if(h_ft == '6.6'){
                if(i==0 || i==(panel_r-1)){
                    r_height = rail_height_21
                }
                else{
                    r_height = rail_height_18
                }
            }
            else if(h_ft == '6.9'){
                if(i==1){
                    r_height = rail_height_18
                }
                else{
                    r_height = rail_height_21
                }
            }
            else if(h_ft == '7'){
                r_height = rail_height_21
            }
            else if(h_ft == '7.6'){
                r_height = rail_height_18
            }
            else if(h_ft == '7.9'){
                if(i==(panel_r-1)){
                    r_height = rail_height_21
                }
                else{
                    r_height = rail_height_18
                }
            }
            else if(h_ft == '8'){
                if(i=='0'||i==(panel_r-1)){
                    r_height = rail_height_21
                }
                else{
                    r_height = rail_height_18
                }
            }            
            else if(h_ft == '8.3'){
                if(i=='1'|| i=='3'){
                    r_height = rail_height_18
                }
                else{
                    r_height = rail_height_21
                }
            }          
            else if(h_ft == '8.6'){
                if(i=='2'){
                    r_height = rail_height_18
                }
                else{
                    r_height = rail_height_21
                }
            }
            else if(h_ft == '9'){
                r_height = rail_height_18
            }
            else if(h_ft == '9.3'){
                if(i==(panel_r-1)){
                    r_height = rail_height_21
                }
                else{
                    r_height = rail_height_18
                }
            }
            else if(h_ft == '9.6'){
                if(i==0 || i==(panel_r-1)){
                    r_height = rail_height_21
                }
                else{
                    r_height = rail_height_18
                }
            }
            else if(h_ft == '9.9'){
                if(i>=1 && i<=3){
                    r_height = rail_height_18
                }
                else{
                    r_height = rail_height_21
                }
            }
            else if(h_ft == '10'){
                if(i=='2'||i=='3'){
                    r_height = rail_height_18
                }
                else{
                    r_height = rail_height_21
                }
            }
            else if(h_ft == '10.3'){
                if(i=='2'){
                    r_height = rail_height_18
                }
                else{
                    r_height = rail_height_21
                }
            }
            
            else if(h_ft == '10.6'){                
                r_height = rail_height_21
            }            
            else if(h_ft == '10.9'){
                if(i==(panel_r-1)){
                    r_height = rail_height_21
                }
                else{
                    r_height = rail_height_18
                }
            }
            else if(h_ft == '11'){
                if(i=='0'||i==(panel_r-1)){
                    r_height = rail_height_21
                }
                else{
                    r_height = rail_height_18
                }
            }
            else if(h_ft == '11.3'){
                if(i>='1'&& i<='4'){
                    r_height = rail_height_18
                }
                else{
                    r_height = rail_height_21
                }
            }
            else if(h_ft == '11.6'){
                if(i>='2'&& i<='4'){
                    r_height = rail_height_18
                }
                else{
                    r_height = rail_height_21
                }
            }
            else if(h_ft == '11.9'){
                if(i=='2' || i=='3'){
                    r_height = rail_height_18
                }
                else{
                    r_height = rail_height_21
                }
            }
            else if(h_ft == '12'){
                if(i==3){
                    r_height = rail_height_18
                }
                else{
                    r_height = rail_height_21
                }
            }
            
            // --------------------------------------------------------------Stamp area
            stamp_area(s_hght, r_height);

            if(h_ft == '6' ){                
                s_hght = s_hght + section_height_18;
            }
            else if(h_ft == '6.3'){
                if(i==(panel_r-1)){
                    s_hght = s_hght + section_height_21;
                }
                else{
                    s_hght = s_hght + section_height_18;  
                }
            }
            else if(h_ft == '6.6'){
                if(i==0 || i==(panel_r-1)){
                    s_hght = s_hght + section_height_21;
                }
                else{
                    s_hght = s_hght + section_height_18;
                }
            }
            else if(h_ft == '6.9'){
                if(i==1){
                    s_hght = s_hght + section_height_18;
                }
                else{
                    s_hght = s_hght + section_height_21;
                }
            }

            else if(h_ft == '7' ){                
                s_hght = s_hght + section_height_21;
            }
            else if(h_ft == '7.6'){            
                s_hght = s_hght + section_height_18;
            }
            else if(h_ft == '7.9'){
                if(i==(panel_r-1)){            
                    s_hght = s_hght + section_height_21;
                }
                else{            
                    s_hght = s_hght + section_height_18;
                }
            }
            else if(h_ft == '8'){     
                if(i== '0' || i== (panel_r-1)){
                    s_hght = s_hght + section_height_21;
                }
                else{
                    s_hght = s_hght + section_height_18;                
                }   
            }
            
            else if(h_ft == '8.3'){     
                if(i== '1' || i== '3'){
                    s_hght = s_hght + section_height_18;
                }
                else{
                    s_hght = s_hght + section_height_21;                
                }   
            }
            else if(h_ft == '9'){
                console.log('------------------------section height ', section_height_18)
                s_hght = s_hght + section_height_18;
            }
            else if(h_ft == '9.3'){
                if(i==(panel_r-1)){
                    s_hght = s_hght + section_height_21;
                }
                else{
                    s_hght = s_hght + section_height_18;
                }
            }
            else if(h_ft == '9.6'){
                if(i==0 || i==(panel_r-1)){
                    s_hght = s_hght + section_height_21;
                }
                else{
                    s_hght = s_hght + section_height_18;
                }
            }
            else if(h_ft == '9.9'){
                if(i>=1 && i<=3){
                    s_hght = s_hght + section_height_18;
                }
                else{
                    s_hght = s_hght + section_height_21;
                }
            }
            else if(h_ft =='10'){
                if(i=='2'||i=='3'){
                    s_hght = s_hght + section_height_18;
                }
                else{
                    s_hght = s_hght + section_height_21;
                }
            } 
            else if(h_ft == '10.3'){
                if(i=='2'){
                    s_hght = s_hght + section_height_18;
                }
                else{
                    s_hght = s_hght + section_height_21;
                }
            }    
            else if(h_ft == '10.6'){  
                s_hght = s_hght + section_height_21;
            }                
            else if(h_ft == '10.9'){
                if(i==(panel_r-1)){
                    s_hght = s_hght + section_height_21;
                }
                else{
                    s_hght = s_hght + section_height_18;
                }
            }  
            else if(h_ft == '11'){
                if(i=='0'||i==(panel_r-1)){
                    s_hght = s_hght + section_height_21;
                }
                else{
                    s_hght = s_hght + section_height_18;
                }
            }
            else if(h_ft == '11.3'){
                if(i>='1'&& i<='4'){
                    s_hght = s_hght + section_height_18;
                }
                else{
                    s_hght = s_hght + section_height_21;
                }
            }
            else if(h_ft == '11.6'){
                if(i>='2'&& i<='4'){
                    s_hght = s_hght + section_height_18;
                }
                else{
                    s_hght = s_hght + section_height_21;
                }
            }
            else if(h_ft == '11.9'){
                if(i=='2' || i=='3'){
                    s_hght = s_hght + section_height_18;
                }
                else{
                    s_hght = s_hght + section_height_21;
                }
            }
            else if(h_ft == '12'){
                if(i==3){
                    s_hght = s_hght + section_height_18;
                }
                else{
                    s_hght = s_hght + section_height_21;
                }
            }

            set_section_height(s_hght, i);  
            s_hght+=1;
        }
        function set_section_height(s_height, panel_row){
            console.log('set section height ----', s_height);
            if(panel_row < panel_r-1){
                hr_divider(0, s_height, w, '#120c07');
                hr_divider(0, s_height+1, w, '#5c3c23');
            }
            

            
        }

        console.log('End of s_hght', s_hght);
        
    }
    function hr_divider(mx, y, lx, clr){
        if(y<h){
            //console.log('sizes to build divider : ', mx, y, lx);
            ctx.beginPath();
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = clr;
            ctx.moveTo(mx, y);
            ctx.lineTo(lx, y);
            ctx.stroke();
        }
        
    }

    // ==========================================================================Stamp section=============

    

    function stamp_area(s_height, r_height){
        console.log('------------------------------ stamp area');

        for(p = 0; p<panel_count;p++){
            stamps_col(end_stl_spacing, s_height, p, r_height);
        } 

        

       
    }

    function stamps_col(x, panel_y, p_count, r_height){
        
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.fillStyle = base_color;
        ctx.fillRect(x+((panel_width+c_stl_spacing)*p_count), panel_y+r_height, panel_width, panel_height);
        ctx.fill();

        left_outer_shadow(x+((panel_width+c_stl_spacing)*p_count), panel_y+r_height);
        top_outer_shadow(x+((panel_width+c_stl_spacing)*p_count), panel_y+r_height);
        right_outer_shadow(x+((panel_width+c_stl_spacing)*p_count), panel_y+r_height);
        bottom_outer_shadow(x+((panel_width+c_stl_spacing)*p_count), panel_y+r_height);
        
        left_inner_shadow(x+((panel_width+c_stl_spacing)*p_count)+(beveled_edge/2), panel_y+r_height);
        top_inner_shadow(x+((panel_width+c_stl_spacing)*p_count), panel_y+r_height);
        right_inner_shadow(x+((panel_width+c_stl_spacing)*p_count), panel_y+r_height);
        bottom_inner_shadow(x+((panel_width+c_stl_spacing)*p_count), panel_y+r_height);
    }


    // -------------------------------------------inner shadow

    function left_inner_shadow(stamp_x, stamp_y ){
        ctx.beginPath();
        ctx.fillStyle = '#4d321d';
        // ctx.strokeStyle = 'red';
        ctx.moveTo(stamp_x, stamp_y+(beveled_edge/2));
        ctx.lineTo(stamp_x+(beveled_edge/2), stamp_y+beveled_edge);
        ctx.lineTo(stamp_x+(beveled_edge/2), stamp_y+panel_height-(beveled_edge));
        ctx.lineTo(stamp_x, stamp_y+panel_height-(beveled_edge/2));
        ctx.fill();
    }

    function top_inner_shadow(stamp_x, stamp_y ){
        ctx.beginPath();
        ctx.fillStyle = '#4a301c';
        // ctx.strokeStyle = 'red';
        ctx.moveTo(stamp_x+(beveled_edge/2), stamp_y+(beveled_edge/2));
        ctx.lineTo(stamp_x+panel_width-(beveled_edge/2), stamp_y+(beveled_edge/2));
        ctx.lineTo(stamp_x+panel_width-(beveled_edge), stamp_y+(beveled_edge));
        ctx.lineTo(stamp_x+(beveled_edge), stamp_y+(beveled_edge));
        ctx.fill();
    }
     
    function right_inner_shadow(stamp_x, stamp_y ){
        ctx.beginPath();
        ctx.fillStyle = '#372415';
        // ctx.strokeStyle = 'red';
        ctx.moveTo(stamp_x+panel_width-(beveled_edge/2), stamp_y+(beveled_edge/2));
        ctx.lineTo(stamp_x+panel_width-(beveled_edge/2), stamp_y+panel_height-beveled_edge/2);
        ctx.lineTo(stamp_x+panel_width-(beveled_edge), stamp_y+panel_height-(beveled_edge));
        ctx.lineTo(stamp_x+panel_width-(beveled_edge), stamp_y+(beveled_edge));
        ctx.fill();
    }

    function bottom_inner_shadow(stamp_x, stamp_y ){
        ctx.beginPath();
        ctx.fillStyle = '#302016';
        // ctx.strokeStyle = 'red';
        ctx.moveTo(stamp_x+(beveled_edge), stamp_y+panel_height-(beveled_edge));
        ctx.lineTo(stamp_x+panel_width-(beveled_edge), stamp_y+panel_height-(beveled_edge));
        ctx.lineTo(stamp_x+panel_width-(beveled_edge/2), stamp_y+panel_height-(beveled_edge/2));
        ctx.lineTo(stamp_x+(beveled_edge/2), stamp_y+panel_height-(beveled_edge/2));
        ctx.fill();
    }

    // -----------------------------------------------outer shadow
    function left_outer_shadow(stamp_x, stamp_y ){
        ctx.beginPath();
        ctx.fillStyle = '#372415';
        ctx.moveTo(stamp_x, stamp_y);
        ctx.lineTo(stamp_x+(beveled_edge/2), stamp_y+(beveled_edge/2));
        ctx.lineTo(stamp_x+(beveled_edge/2), stamp_y+panel_height-(beveled_edge/2));
        ctx.lineTo(stamp_x, stamp_y+panel_height);
        ctx.fill();
    }
    function top_outer_shadow(stamp_x, stamp_y ){
        ctx.beginPath();
        ctx.fillStyle = '#302016';
        // ctx.fillStyle = 'red';
        ctx.moveTo(stamp_x, stamp_y);
        ctx.lineTo(stamp_x+panel_width, stamp_y);
        ctx.lineTo(stamp_x+panel_width-(beveled_edge/2), stamp_y+(beveled_edge/2));
        ctx.lineTo(stamp_x+(beveled_edge/2), stamp_y+(beveled_edge/2));
        ctx.fill();
    }
    function right_outer_shadow(stamp_x, stamp_y ){
        ctx.beginPath();
        ctx.fillStyle = '#4a301c';
        ctx.moveTo(stamp_x+panel_width, stamp_y);
        ctx.lineTo(stamp_x+panel_width, stamp_y+panel_height);
        ctx.lineTo(stamp_x+panel_width-(beveled_edge/2), stamp_y+panel_height-(beveled_edge/2));
        ctx.lineTo(stamp_x+panel_width-(beveled_edge/2), stamp_y+(beveled_edge/2));
        ctx.fill();
    }
    
    function bottom_outer_shadow(stamp_x, stamp_y ){
        ctx.beginPath();
        ctx.fillStyle = '#4d321d';
        ctx.moveTo(stamp_x, stamp_y+panel_height);
        ctx.lineTo(stamp_x+panel_width, stamp_y+panel_height);
        ctx.lineTo(stamp_x+panel_width-(beveled_edge/2), stamp_y+panel_height-(beveled_edge/2));
        ctx.lineTo(stamp_x+(beveled_edge/2), stamp_y+panel_height-(beveled_edge/2));
        ctx.fill();
    }
    

    // ----------------------------------Long Panel Wagon Wheel Window Section  --------------------------------

    function window_frame_lpww(x, y, w, h, count){
        ctx.strokeStyle = 'transparent';
        ctx.strokeRect(x, y, w, h);
        ctx.stroke();

        window_base_lpww(x, y, w, h);  
        
        window_inner_layer_lpww(x+12, y+10, w-24, h-20);

        window_lpww(x+12, y+10, w-22, h-20, count);

        for(d=1; d<=2; d++){
            if(d==1){
                frame_triangles_lpww(x+20, y+18, x+110, x+50, h, d);
            }
            else{
                frame_triangles_lpww(x+w-24, y+18, x+w-110, x+w-55, h, d);
            }            
        }        

        ctx.beginPath();
        ctx.lineWidth = 2;
        // ctx.strokeStyle = '#f3f4f1';
        ctx.strokeStyle = lighter2;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y+h);
        ctx.stroke();

        ctx.beginPath();
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = lighter1;
        ctx.moveTo(x+w-6, y+6);
        ctx.lineTo(x+w-6, y+h-6);
        ctx.stroke();
        
    

        function frame_triangles_lpww(x, y, lx, qx, h, d){
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = darker1;
            ctx.moveTo(x+2, y);
            ctx.lineTo(lx, y);
            ctx.quadraticCurveTo(qx, y+14, x+2, y+h-54);
            ctx.lineTo(x+2, y);
            ctx.stroke();

            ctx.save();
            ctx.clip();

                ctx.beginPath();
                ctx.lineWidth = 6;
                ctx.shadowColor = 'transparent';
                if(d==1){
                    ctx.strokeStyle = lighter2;
                }
                else{
                    ctx.strokeStyle = lighter1;
                }        
                ctx.moveTo(x+2, y);
                ctx.lineTo(x+2, y+h-54);
                ctx.stroke();

                ctx.beginPath();
                if(d==2){
                    ctx.strokeStyle = darker1;
                }
                else{
                    ctx.strokeStyle = darker2;
                }
                ctx.moveTo(lx, y);
                ctx.quadraticCurveTo(qx, y+14, x+2, y+h-54);
                ctx.stroke();

            ctx.restore();
        }

        function window_base_lpww(x, y, w, h){
            ctx.beginPath();
            ctx.moveTo(x+2, y+2);
            ctx.lineTo(x+w-4, y+2);
            ctx.lineTo(x+w-4, y+h-4);
            ctx.lineTo(x+2, y+h-4);
            
            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 0.1;
            ctx.shadowBlur = 2;
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.strokeStyle = base_color;
            ctx.strokeRect(x+3, y+3, w-7, h-6);
        }
    
        function window_inner_layer_lpww(x, y, w, h){
            ctx.fillStyle = base_color;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 4;
            ctx.shadowColor = 'rgba(0,0,0,0.2)';
            ctx.fillRect(x, y, w, h);
            ctx.fill();

            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.shadowColor = 'transparent';
            ctx.strokeStyle = lighter1;
            ctx.moveTo(x+1, y);
            ctx.lineTo(x+1, y+h);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = darker2;
            ctx.moveTo(x+6, y+4);
            ctx.lineTo(x+6, y+h-4);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = lighter1;
            ctx.moveTo(x+w-5, y+4);
            ctx.lineTo(x+w-5, y+h-4);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = darker1;
            ctx.moveTo(x+6, y+4);
            ctx.lineTo(x+w-5, y+4);
            ctx.stroke();        
        }

        function window_lpww(x, y, w, h, count){        
            window_design_lpww(x-3, y-1, w-2, h, lighter2, 3);
            window_design_lpww(x, y-1, w+1, h, darker2, 2);
            window_design_lpww(x, y, w-2, h, base_color, 6);

            ctx.save();
            ctx.clip();
                
                if(count == 0){
                    ctx.fillStyle = rad_grad(x, y, w, h, count);
                }
                else if(count==1){
                    ctx.fillStyle = rad_grad(x, y, w, h, count);
                }  

                ctx.fillRect(x, y, w, h);
                //ctx.fill();

                window_design_lpww(x-1, y, w, h, darker1, 3);

                decraTrim_lpww(x, y, w, h, x+(w/2));

            ctx.restore();        
        }

        function decraTrim_lpww(x, y, w, h, end_x){        
            for(q=1; q<6; q++){
                dt_lines_lpww(x, y, end_x, q);
                x = x+80;
            }

            function dt_lines_lpww(sx, y, ex, count){
                ctx.beginPath();
                ctx.lineWidth = 6;
                ctx.strokeStyle = base_color;
                if(count==1){                
                    ctx.moveTo(sx, y+35);
                    ctx.lineTo(ex, y+h);                     
                    ctx.stroke();
                    dt_line_shadow_lpww(sx-30, y+22, ex-22, y+h-10);
                }
                else if(count==2){
                    ctx.moveTo(sx, y);
                    ctx.lineTo(ex, y+h);                     
                    ctx.stroke();
                    dt_line_shadow_lpww(sx+2, y, ex-15, y+h-20 );
                }
                else if(count==3){
                    ctx.moveTo(sx, y);
                    ctx.lineTo(ex, y+h);                     
                    ctx.stroke();
                    dt_line_shadow_lpww(sx+2, y, ex+2, y+h-18 );
                }     
                else if(count==4){                
                    ctx.moveTo(sx, y);
                    ctx.lineTo(ex, y+h);                     
                    ctx.stroke();
                    dt_line_shadow_lpww(sx-2, y, ex, y+h-3 );
                } 
                else if(count==5){
                    ctx.moveTo(sx, y+35);
                    ctx.lineTo(ex, y+h);                     
                    ctx.stroke();
                    dt_line_shadow_lpww(sx-28, y+43, ex-6, y+h);
                }  
            }
            function dt_line_shadow_lpww(sh_x, sh_y, sh_lx, sh_ly){
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                ctx.moveTo(sh_x, sh_y);
                ctx.lineTo(sh_lx, sh_ly);
                ctx.stroke();
            }        
        }
    
        function window_design_lpww(x, y, w, h, clr, stroke){
            ctx.beginPath();
            ctx.lineWidth = stroke;
            ctx.strokeStyle = clr;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 1;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            ctx.moveTo(x+6, y+h-4);
            ctx.bezierCurveTo(x+60, y-24, x+w-62, y-24, x+w-8, y+h-4);
            ctx.lineTo(x+(w/2)+20, y+h-4);
            ctx.bezierCurveTo(x+(w/2)+20, y+h-30, x+(w/2)-20, y+h-30, x+(w/2)-20, y+h-4);
            ctx.lineTo(x+6, y+h-4);
            ctx.stroke();
        }
    }

    // --------------------------------Long Panel Decra Glasses ------------------------------------
    function window_lp_decraglass(x, y, w, h, lpml_count){
        ctx.strokeStyle = 'transparent';
        ctx.strokeRect(x, y, w, h);
        ctx.stroke();

        window_base_lpml(x, y, w, h);    
        
        window_inner_layer_lpml(x+10, y+10, w-22, h-20);

        window_lpml(x+12, y+14, w-20, h-20, lpml_count);

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = lighter2;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y+h);
        ctx.stroke();


        ctx.beginPath();
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = lighter1;
        ctx.moveTo(x+w-6, y+6);
        ctx.lineTo(x+w-6, y+h-6);
        ctx.stroke();

        function window_base_lpml(x, y, w, h){
            ctx.beginPath();
            ctx.moveTo(x+2, y+2);
            ctx.lineTo(x+w-4, y+2);
            ctx.lineTo(x+w-4, y+h-4);
            ctx.lineTo(x+2, y+h-4);

            ctx.save();
            ctx.clip();

            // window frame inner shadow
            ctx.beginPath();
            //ctx.moveTo();
            // ctx.line


            ctx.restore();

            ctx.lineWidth = 4;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 0.1;
            ctx.shadowBlur = 2;
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.strokeStyle = base_color;
            ctx.strokeRect(x+3, y+3, w-7, h-6);
            //ctx.stroke();
        }

    
        function window_inner_layer_lpml(x, y, w, h){
            ctx.fillStyle = base_color;
            //ctx.fillStyle = 'red';
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 4;
            ctx.shadowColor = 'rgba(0,0,0,0.2)';
            ctx.fillRect(x, y, w, h);
            ctx.fill();

            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.shadowColor = 'transparent';
            ctx.strokeStyle = lighter2;
            ctx.moveTo(x+1, y);
            ctx.lineTo(x+1, y+h);
            ctx.stroke();
        }


        function window_lpml(x, y, w, h, lpml_count){
            
            window_design_lpml(x, y, w, h, lpml_count, 10, base_color);
            window_design_lpml(x-2, y-3, w, h, lpml_count, 2, 'rgba(255,255,255,0.3)');

            ctx.save();
            ctx.clip();

            selectedlpdecraglass = selectedWindow;

            if(selectedlpdecraglass == 'lpvictorian'){
                pic = "lp_decraglasses/LP_Victorian.png";
            }
            else if(selectedlpdecraglass == 'lpriviera'){
                pic = "lp_decraglasses/LP_Riviera.png";
            }
            else if(selectedlpdecraglass == 'lpchalet'){
                pic = "lp_decraglasses/LP_Chalet.png";
            }
            else if(selectedlpdecraglass == 'lpamericana'){
                pic = "lp_decraglasses/LP_Americana.png";
            }
            else if(selectedlpdecraglass == 'lpheartland'){
                pic = "lp_decraglasses/LP_Heartland.png";
            }
            else if(selectedlpdecraglass == 'lpmission'){
                pic = "lp_decraglasses/LP_Mission.png";
            }
            else if(selectedlpdecraglass == 'lpprairie'){
                pic = "lp_decraglasses/LP_Prairie.png";
            }
            else if(selectedlpdecraglass == 'lpjardin'){
                pic = "lp_decraglasses/LP_Jardin.png";
            }
            else if(selectedlpdecraglass == 'lptrellis'){
                pic = "lp_decraglasses/LP_Trellis.png";
            }
            decra_glass(pic, x-5, y-7);
            ctx.fillRect(x, y, w, h);  

            ctx.restore();

            
            
        }

        function decra_glass(pic, x, y){
            console.log('decra_glass');
            decragls_img1 = new Image();
            decragls_img1.src = pic;
            decragls_img1.onload = function(){
                ctx.drawImage(decragls_img1, x, y);
            }
        }
    
        function window_design_lpml(x, y, w, h, lpml_count, lw, clr){
            if(lpml_count==0){
                ctx.beginPath();
                ctx.lineWidth = lw;
                ctx.lineCap = 'butt';
                ctx.strokeStyle = clr;
                // ctx.strokeStyle = 'red';                
                
                ctx.moveTo(x+6, y);
                ctx.lineTo(x+w-10, y);
                
                //ctx.lineTo(x+w-8, y+6);
                ctx.lineTo(x+w-10, y+h-6);
                ctx.lineTo(x+6, y+h-6);
                ctx.lineTo(x+6, y);
                ctx.stroke();
            }
            else{
                ctx.beginPath();
                ctx.lineWidth = 10;
                ctx.lineCap = 'butt';
                ctx.strokeStyle = base_color;               
                
                ctx.moveTo(x+6, y);
                ctx.lineTo(x+w-10, y);
                //ctx.lineTo(x+w-8, y+6);
                ctx.lineTo(x+w-10, y+h-6);
                ctx.lineTo(x+6, y+h-6);
                ctx.lineTo(x+6, y+31);
                ctx.stroke();
            }
            

        }

        
    
    }


   
    // -----------------------------Long Panel Moonlite Window Section ----------------------------------
    
    
    function window_frame_lpml(x, y, w, h, lpml_count){
        ctx.strokeStyle = 'transparent';
        ctx.strokeRect(x, y, w, h);
        ctx.stroke();

        window_base_lpml(x, y, w, h);    
        
        window_inner_layer_lpml(x+10, y+10, w-22, h-20);

        window_lpml(x+12, y+14, w-20, h-20, lpml_count);

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = lighter2;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y+h);
        ctx.stroke();


        ctx.beginPath();
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = lighter1;
        ctx.moveTo(x+w-6, y+6);
        ctx.lineTo(x+w-6, y+h-6);
        ctx.stroke();

        function window_base_lpml(x, y, w, h){
            ctx.beginPath();
            ctx.moveTo(x+2, y+2);
            ctx.lineTo(x+w-4, y+2);
            ctx.lineTo(x+w-4, y+h-4);
            ctx.lineTo(x+2, y+h-4);

            ctx.save();
            ctx.clip();

            // window frame inner shadow
            ctx.beginPath();
            //ctx.moveTo();
            // ctx.line


            ctx.restore();

            ctx.lineWidth = 4;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 0.1;
            ctx.shadowBlur = 2;
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.strokeStyle = base_color;
            ctx.strokeRect(x+3, y+3, w-7, h-6);
            //ctx.stroke();
        }

    
        function window_inner_layer_lpml(x, y, w, h){
            ctx.fillStyle = base_color;
            //ctx.fillStyle = 'red';
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 4;
            ctx.shadowColor = 'rgba(0,0,0,0.2)';
            ctx.fillRect(x, y, w, h);
            ctx.fill();

            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.shadowColor = 'transparent';
            ctx.strokeStyle = lighter2;
            ctx.moveTo(x+1, y);
            ctx.lineTo(x+1, y+h);
            ctx.stroke();
        }


        function window_lpml(x, y, w, h, lpml_count){
            
            window_design_lpml(x, y, w, h, lpml_count, 10, base_color);
            window_design_lpml(x-2, y-3, w, h, lpml_count, 2, 'rgba(255,255,255,0.3)');

            ctx.save();
            ctx.clip();

            if(lpml_count == 0){
                ctx.fillStyle = rad_grad(x, y, w, h, lpml_count);
            }
            else if(lpml_count==1){
                ctx.fillStyle = rad_grad(x, y, w, h, lpml_count);
            } 
            ctx.fillRect(x, y, w, h);           

            decraTrim_lpml(x-2, y, w, h);

            ctx.restore();

            
            
        }
    
        function window_design_lpml(x, y, w, h, lpml_count, lw, clr){
            if(lpml_count==0){
                ctx.beginPath();
                ctx.lineWidth = lw;
                ctx.lineCap = 'butt';
                ctx.strokeStyle = clr;
                // ctx.strokeStyle = 'red';
                
                if(selectedWindow == 'lpml' || selectedWindow == 'arch_thm' ){
                    ctx.moveTo(x+6, y+35);
                    ctx.quadraticCurveTo(x+145, y+5, x+w-10,  y+5)
                }
                else if(selectedWindow == 'cascade'){
                    ctx.moveTo(x+6, y+35);
                    ctx.quadraticCurveTo(x+145, y-25, x+w-10,  y+35)
                }
                else{
                    ctx.moveTo(x+6, y);
                    ctx.lineTo(x+w-10, y);
                }
                
                //ctx.lineTo(x+w-8, y+6);
                ctx.lineTo(x+w-10, y+h-6);
                ctx.lineTo(x+6, y+h-6);
                ctx.lineTo(x+6, y+35);
                ctx.stroke();
            }
            else{
                ctx.beginPath();
                ctx.lineWidth = 10;
                ctx.lineCap = 'butt';
                ctx.strokeStyle = base_color;
                
                if(selectedWindow == 'lpml' || selectedWindow == 'arch_thm' ){
                    ctx.moveTo(x+6, y+5);
                    ctx.quadraticCurveTo(x+145, y+5, x+w-10,  y+35)
                }
                else if(selectedWindow == 'cascade'){
                    ctx.moveTo(x+6, y+35);
                    ctx.quadraticCurveTo(x+145, y-25, x+w-10,  y+35)
                }
                else{
                    ctx.moveTo(x+6, y);
                    ctx.lineTo(x+w-10, y);
                }
                //ctx.lineTo(x+w-8, y+6);
                ctx.lineTo(x+w-10, y+h-6);
                ctx.lineTo(x+6, y+h-6);
                ctx.lineTo(x+6, y+31);
                ctx.stroke();
            }
            

        }

        function decraTrim_lpml(x, y, w, h){
            ctx.strokeStyle = 'transparent';
            ctx.strokeRect(x, y, x+w-40, y+h);
            ctx.stroke();

            for(m = y+45; m<(y+120); m=m+50){
                if(selectedWindow == 'lpml' || selectedWindow == 'cascade'){
                    hr_line_lpml(x+7, m, x+w-8);
                }                
            }
            for(m = y; m<(y+120); m+=120){
                if(selectedWindow == 'cascade'){
                    for(n=x+64; n<x+350; n=n+64){
                        v_line_lpml(n, m, 6);
                    }
                }
                else if(selectedWindow == 'lpml'){
                    for(n=x+53; n<x+350; n=n+52){
                        v_line_lpml(n, m, 6);
                    }
                }
                else if(selectedWindow == 'arch_thm' || selectedWindow == 'thames' ){
                    for(n=x+79; n<x+350; n=n+79){
                        v_line_lpml(n, m, 10);
                    }
                }
            }

            function v_line_lpml(o_x, o_y, lw){
                ctx.beginPath();
                ctx.lineWidth = lw;
                ctx.lineCap = 'butt';
                ctx.strokeStyle = base_color;
                // ctx.strokeStyle = 'red';
                ctx.moveTo(o_x, o_y);
                ctx.lineTo(o_x, o_y+h-8);
                ctx.stroke();

                if(selectedWindow == 'lpml' || selectedWindow == 'cascade'){
                    v_shadow_lpml(o_x-2, o_y+2, o_y+h);
                }
                else if(selectedWindow == 'arch_thm' || selectedWindow == 'thames'){
                    v_shadow_lpml2(o_x-2, o_y+2, o_y+h);
                }
            }
            function v_shadow_lpml(x,y, ly){
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.shadowColor = 'transparent';
                ctx.strokeStyle = lighter1;
                //ctx.strokeStyle = 'red';
                ctx.moveTo(x, y);
                ctx.lineTo(x, ly);
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(0,0,0,0.2)';
                if(selectedWindow == 'lpml' || selectedWindow == 'cascade'){
                    ctx.moveTo(x+4, y);
                    ctx.lineTo(x+4, ly);
                }
                else{
                    ctx.moveTo(x+7, y);
                    ctx.lineTo(x+7, ly);
                }
                ctx.stroke();
            }

            function v_shadow_lpml2(x,y, ly){
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.shadowColor = 'transparent';
                ctx.strokeStyle = lighter1;
                //ctx.strokeStyle = 'red';
                ctx.moveTo(x, y);
                ctx.lineTo(x, ly);
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(0,0,0,0.2)';
                ctx.moveTo(x+7, y);
                ctx.lineTo(x+7, ly);
                ctx.stroke();
            }

            function hr_line_lpml(x, y, lx){
                ctx.beginPath();
                ctx.lineWidth = 8;
                ctx.lineCap = 'round';
                ctx.strokeStyle = base_color;
                ctx.moveTo(x, y);
                ctx.lineTo(lx, y);
                ctx.stroke();

                hr_shadow_lpml(x, y, lx);
            }

            function hr_shadow_lpml(x,y, lx){
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = lighter1;
                ctx.moveTo(x, y-3);
                ctx.lineTo(lx, y-3);
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(0,0,0,0.2)';
                ctx.moveTo(x, y+3);
                ctx.lineTo(lx, y+3);
                ctx.stroke();
            }

            function diagonal_shadow_lpml(x, mid_y, y){
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                ctx.moveTo(x+5, mid_y-1);
                ctx.lineTo(x+40, y+6);
                ctx.moveTo(x+46, y);
                ctx.lineTo(x+88, mid_y);
                ctx.moveTo(x+84, mid_y+4);
                ctx.lineTo(x+46, y+mid_y-6);
                ctx.moveTo(x+4, mid_y);
                ctx.lineTo(x+40, y+mid_y-12);
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                // ctx.strokeStyle = 'red';
                ctx.moveTo(x-1, mid_y-3);
                ctx.lineTo(x+36, y);
                ctx.moveTo(x+44, y+6);
                ctx.lineTo(x+78, mid_y-2);
                ctx.moveTo(x+80, mid_y-1);
                ctx.lineTo(x+42, y+mid_y-12);
                ctx.moveTo(x, mid_y+6);
                ctx.lineTo(x+36, y+mid_y-6);
                ctx.stroke();
            }
        }
    
    }



    //===================================================== Long Panel Cathedral =========================

    function window_frame_cathedral(x, y, w, h, count){
        ctx.strokeStyle = 'transparent';
        ctx.strokeRect(x, y, w, h);
        ctx.stroke();

        window_base_ctdl(x, y, w, h);

        window_outer_layer_ctdl(x, y, w, h);    
        
        window_inner_layer_ctdl(x+8, y+8, w-18, h-18);

        window_ctdl(x+10, y+10, w-20, h-20, count);
        
    }

    function window_base_ctdl(x, y, w, h){
        ctx.beginPath();
        ctx.moveTo(x+2, y+2);
        ctx.lineTo(x+w-4, y+2);
        ctx.lineTo(x+w-4, y+h-4);
        ctx.lineTo(x+2, y+h-4);

        ctx.save();
        ctx.clip();

        ctx.strokeStyle = base_color;
        ctx.shadowOffsetX = -3;
        ctx.shadowOffsetY = -2;
        ctx.shadowBlur = 1;
        ctx.shadowColor = darker2;
        ctx.strokeRect(x+2, y-1, w-6, h-3);


        ctx.restore();

        ctx.lineWidth = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 0.5;
        ctx.shadowBlur = 3;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.strokeStyle = base_color;
        ctx.strokeRect(x+3, y+3, w-7, h-6);
        //ctx.stroke();
    }

    function window_outer_layer_ctdl(x, y, w, h){
        ctx.lineWidth = 1;
        ctx.shadowColor = 'transparent';
        // left highlight line
        ctx.beginPath();
        ctx.strokeStyle = lighter2;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y+h);
        ctx.stroke();

        // right highlight line
        ctx.beginPath();
        ctx.strokeStyle = darker1;
        ctx.moveTo(x+w, y);
        ctx.lineTo(x+w, y+h);
        ctx.stroke();

        // botttom shadow line
        ctx.beginPath();
        ctx.strokeStyle = darker2;
        ctx.moveTo(x, y+h);
        ctx.lineTo(x+w, y+h);
        ctx.stroke();

        // top shadow line
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = darker1;
        ctx.moveTo(x, y);
        ctx.lineTo(x+w, y);
        ctx.stroke();
    }

    function window_inner_layer_ctdl(x, y, w, h){
        ctx.fillStyle = base_color;
        //ctx.fillStyle = 'red';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = .5;
        ctx.shadowBlur = 2;
        ctx.shadowColor = 'rgba(0,0,0,0.4)';
        ctx.fillRect(x, y, w-1, h);
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = lighter2;
        ctx.moveTo(x+1, y);
        ctx.lineTo(x+1, y+h);
        ctx.stroke();
    }


    function window_ctdl(x, y, w, h, count){
        
        window_design_ctdl(x, y, w, h, base_color, 1);

        ctx.save();
        ctx.clip();

        //var grad = rad_grad(win_grad);
        // if(count == 0){
        //     ctx.fillStyle = rad_grad(win_grad_l);
        // }
        // else if(count==1){
        //     ctx.fillStyle = rad_grad(win_grad_r);
        // } 
        
        if(count == 0){
            ctx.fillStyle = rad_grad(x, y, w, h, count);
        }
        else if(count==1){
            ctx.fillStyle = rad_grad(x, y, w, h, count);
        }  
        ctx.fillRect(x, y, w, h);
        //ctx.fill();

        window_design_ctdl(x-2, y+1, w+2, h+1, lighter1, 2);
        window_design_ctdl(x+1, y-1, w+1, h+2, darker2, 3);

        

        ctx.restore();
        
    }
    
    function window_design_ctdl(x, y, w, h, stroke, lw){
        ctx.beginPath();
        ctx.lineWidth = lw;
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = stroke;
        ctx.moveTo(x+2, y+h-4);
        ctx.lineTo(x+w-4, y+h-4);
        ctx.lineTo(x+w-4, y+h-20);
        ctx.lineTo(x+w-12, y+h-20);
        ctx.quadraticCurveTo(x+w-12, y+60, x+w-30, y+h-35);
        ctx.quadraticCurveTo(x+w/2, y-45, x+30, y+h-35);
        ctx.quadraticCurveTo(x+12, y+60, x+12, y+h-20);
        ctx.lineTo(x+2, y+h-20);
        ctx.lineTo(x+2, y+h-4);
        ctx.stroke();

        
        
    }


    // =======================================Long Panel Stockton--------------------------------------------

    function window_frame_stktn(x, y, w, h, count){
        ctx.strokeStyle = 'transparent';
        ctx.strokeRect(x, y, w, h);
        ctx.stroke();

        window_base_stktn(x, y, w, h);

        window_outer_layer_stktn(x, y, w, h);    
        
        window_inner_layer_stktn(x+10, y+10, w-22, h-20);

        window_stktn(x+10, y+10, w-20, h-20, count);
        
    }

    function window_base_stktn(x, y, w, h){
        ctx.beginPath();
        ctx.moveTo(x+2, y+2);
        ctx.lineTo(x+w-4, y+2);
        ctx.lineTo(x+w-4, y+h-4);
        ctx.lineTo(x+2, y+h-4);

        ctx.save();
        ctx.clip();

        // window frame inner shadow
        ctx.strokeStyle = base_color;
        ctx.shadowOffsetX = -3;
        ctx.shadowOffsetY = -2;
        ctx.shadowBlur = 1;
        // ctx.shadowColor = 'frame_inner_shadw_light' ;
        ctx.shadowColor = lighter2;
        ctx.strokeRect(x+2, y-1, w-6, h-3);


        ctx.restore();

        ctx.lineWidth = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 3;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.strokeStyle = base_color;
        ctx.strokeRect(x+3, y+3, w-7, h-6);
        //ctx.stroke();
    }

    function window_outer_layer_stktn(x, y, w, h){
        ctx.lineWidth = 1;
        ctx.shadowColor = 'transparent';
        // left highlight line
        ctx.beginPath();
        ctx.strokeStyle = lighter2;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y+h);
        ctx.stroke();

        // right highlight line
        ctx.beginPath();
        ctx.strokeStyle = darker2;
        ctx.moveTo(x+w, y);
        ctx.lineTo(x+w, y+h);
        ctx.stroke();

        // botttom shadow line
        ctx.beginPath();
        ctx.strokeStyle = darker2;
        ctx.moveTo(x, y+h);
        ctx.lineTo(x+w, y+h);
        ctx.stroke();

        // top shadow line
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = darker1;
        ctx.moveTo(x, y);
        ctx.lineTo(x+w, y);
        ctx.stroke();
    }

    function window_inner_layer_stktn(x, y, w, h){
        ctx.fillStyle = base_color;
        //ctx.fillStyle = 'red';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.fillRect(x, y, w, h);
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = lighter2;
        ctx.moveTo(x+1, y);
        ctx.lineTo(x+1, y+h);
        ctx.stroke();
    }


    function window_stktn(x, y, w, h, count){
        
        window_design_stktn(x, y, w, h, base_color, 1);

        ctx.save();
        ctx.clip();

        //var grad = rad_grad(win_grad);
        if(count == 0){
            ctx.fillStyle = rad_grad(x, y, w, h, count);
        }
        else if(count==1){
            ctx.fillStyle = rad_grad(x, y, w, h, count);
        }  
        ctx.fillRect(x, y, w, h);
        //ctx.fill();

        // window_design(x-2, y+1, w+2, h+1, 'rgb(92, 62, 39)', 2);
        // window_design(x+1, y-1, w+1, h+2, 'rgb(36, 23, 12)', 3);

        

        ctx.restore();

        decraTrim_stktn(x, y+3, w, h);
        
    }
    
    function window_design_stktn(x, y, w, h, stroke, lw){
        ctx.beginPath();
        ctx.lineWidth = lw;
        ctx.strokeStyle = stroke;
        ctx.moveTo(x+2, y+2);
        ctx.lineTo(x+w-4, y+2);
        ctx.lineTo(x+w-4, y+h-2);
        ctx.lineTo(x+2, y+h-2);
        ctx.stroke();
    }

    function decraTrim_stktn(x, y, w, h){
        for(k=y; k<=(y+h); k+=44.5){
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.shadowColor = 'transparent';
            ctx.lineCap = 'round';
            ctx.strokeStyle = base_color;
            ctx.moveTo(x+4, k);
            ctx.lineTo(x+w-6, k);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0,0,0,0.1)';
            ctx.lineWidth = 2;
            ctx.moveTo(x+6, k+1.5);
            ctx.lineTo(x+w-10, k+1.5);
            ctx.stroke();
        }
        for(m = x; m<(x+w); m+=(w/7+6) ){
            ctx.beginPath();
            ctx.shadowColor = 'transparent';
            ctx.strokeStyle = base_color;
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.moveTo(m+4, y+3);
            ctx.lineTo(m+4, y+h-10);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0,0,0,0.1)';
            ctx.lineWidth = 2;
            ctx.moveTo(m+6, y+3);
            ctx.lineTo(m+6, y+h-10);
            ctx.stroke();
        }
    }



    // ============================================Long Panel Prairie-0-------------------------------------


    function window_frame_prr(x, y, w, h, count){
        ctx.strokeStyle = 'transparent';
        ctx.strokeRect(x, y, w, h);
        ctx.stroke();
        

        window_base_prr(x, y, w, h);
        
        window_inner_layer_prr(x+10, y+10, w-22, h-20);

        window_prr(x+10, y+10, w-20, h-20, count);

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = lighter2;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y+h);
        ctx.stroke();


        ctx.beginPath();
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = lighter1;
        ctx.moveTo(x+w-5.5, y+6);
        ctx.lineTo(x+w-5.5, y+h-6);
        ctx.stroke();

        

        
        
    }

    function window_base_prr(x, y, w, h){
        ctx.beginPath();
        ctx.moveTo(x+2, y+2);
        ctx.lineTo(x+w-4, y+2);
        ctx.lineTo(x+w-4, y+h-4);
        ctx.lineTo(x+2, y+h-4);

        ctx.save();
        ctx.clip();

        // window frame inner shadow
        ctx.beginPath();
        //ctx.moveTo();
        // ctx.line


        ctx.restore();

        ctx.lineWidth = 4;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 3;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.strokeStyle = base_color;
        ctx.strokeRect(x+3, y+3, w-7, h-6);
        //ctx.stroke();
    }


    function window_inner_layer_prr(x, y, w, h){
        ctx.fillStyle = base_color;
        //ctx.fillStyle = 'red';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.fillRect(x, y, w, h);
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = lighter2;
        ctx.moveTo(x+1, y);
        ctx.lineTo(x+1, y+h);
        ctx.stroke();
    }


    function window_prr(x, y, w, h, count){
        
        window_design_prr(x, y, w, h);

        ctx.save();
        ctx.clip();
        
        if(count == 0){
            ctx.fillStyle = rad_grad(x, y, w, h, count);
        }
        else if(count==1){
            ctx.fillStyle = rad_grad(x, y, w, h, count);
        }         

        ctx.fillRect(x, y, w, h);

        ctx.restore();

        decraTrim_prr(x, y+3, w, h);
        
    }
    
    function window_design_prr(x, y, w, h){
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.lineCap = 'butt';
        ctx.strokeStyle = base_color;
        ctx.moveTo(x+6, y+6);
        ctx.lineTo(x+w-8, y+6);
        ctx.lineTo(x+w-8, y+h-6);
        ctx.lineTo(x+6, y+h-6);
        ctx.lineTo(x+6, y+1);
        ctx.stroke();

    }

    function decraTrim_prr(x, y, w, h){
        ctx.strokeStyle = 'transparent';
        ctx.strokeRect(x, y, x+w-40, y+h);
        ctx.stroke();

        

        for(m = y+30; m<(y+100); m=m+30){
            hr_line_prr(x+5, m, x+stamp_area_w-28);            
        }
        line_count = 0;
        for(m = y+2; m<(y+80); m=m+30){
            for(k=x+50; k<(x+300); k=k+110){
                if(line_count == 1 || line_count == 7){
                    v_line_prr(k-15, m);
                    v_line_prr(k+15, m);    
                }
                else if(line_count == 4){
                }
                else{                    
                    v_line_prr(k, m);
                }
                line_count++;

                
            }
        
        }

        function v_line_prr(o_x, o_y){
            ctx.beginPath();
            ctx.lineWidth = 6;
            ctx.lineCap = 'round';
            ctx.strokeStyle = base_color;
            ctx.moveTo(o_x, o_y+2);
            ctx.lineTo(o_x, o_y+26);
            ctx.stroke();

            v_shadow_prr(o_x-2, o_y+2, o_y+25);
        }
        function v_shadow_prr(x,y, ly){
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.shadowColor = 'transparent';
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.moveTo(x, y);
            ctx.lineTo(x, ly);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(0,0,0,0.1)';
            ctx.moveTo(x+4, y);
            ctx.lineTo(x+4, ly);
            ctx.stroke();
        }

        function hr_line_prr(x, y, lx){
            ctx.beginPath();
            ctx.lineWidth = 6;
            ctx.lineCap = 'round';
            ctx.strokeStyle = base_color;
            ctx.moveTo(x, y);
            ctx.lineTo(lx, y);
            ctx.stroke();

            hr_shadow_prr(x, y, lx);
        }
        

        function hr_shadow_prr(x,y, lx){
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.moveTo(x, y-2);
            ctx.lineTo(lx, y-2);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(0,0,0,0.2)';
            ctx.moveTo(x, y+2);
            ctx.lineTo(lx, y+2);
            ctx.stroke();
        }
        
        
    }

    // -----------------------------------------long panel waterford---------------------------------------

    function window_frame_wtrfd(x, y, w, h, count){
        ctx.strokeStyle = 'transparent';
        ctx.strokeRect(x, y, w, h);
        ctx.stroke();
        

        window_base_wtrfd(x, y, w, h);

        // window_outer_layer(x, y, w, h);    
        
        window_inner_layer_wtrfd(x+10, y+10, w-22, h-20);

        window_wtrfd(x+10, y+10, w-20, h-20, count);

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = lighter1;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y+h);
        ctx.stroke();


        ctx.beginPath();
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = lighter2;
        ctx.moveTo(x+w-5.5, y+6);
        ctx.lineTo(x+w-5.5, y+h-6);
        ctx.stroke();

        

        
        
    }

    function window_base_wtrfd(x, y, w, h){
        ctx.beginPath();
        ctx.moveTo(x+2, y+2);
        ctx.lineTo(x+w-4, y+2);
        ctx.lineTo(x+w-4, y+h-4);
        ctx.lineTo(x+2, y+h-4);

        ctx.save();
        ctx.clip();

        // window frame inner shadow
        ctx.beginPath();
        //ctx.moveTo();
        // ctx.line


        ctx.restore();

        ctx.lineWidth = 4;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 3;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.strokeStyle = base_color;
        ctx.strokeRect(x+3, y+3, w-7, h-6);
        //ctx.stroke();
    }

    // function window_outer_layer_wtrfd(x, y, w, h){
    //     ctx.lineWidth = 1;
    //     ctx.shadowColor = 'transparent';
    //     // left highlight line
    //     ctx.beginPath();
    //     ctx.strokeStyle = 'red';
    //     ctx.moveTo(x, y);
    //     ctx.lineTo(x, y+h);
    //     ctx.stroke();

    //     // right highlight line
    //     ctx.beginPath();
    //     ctx.strokeStyle = 'rgb(143, 130, 112)';
    //     ctx.moveTo(x+w, y);
    //     ctx.lineTo(x+w, y+h);
    //     ctx.stroke();

    //     // botttom shadow line
    //     ctx.beginPath();
    //     ctx.strokeStyle = 'rgb(154, 143, 126)';
    //     ctx.moveTo(x, y+h);
    //     ctx.lineTo(x+w, y+h);
    //     ctx.stroke();

    //     // top shadow line
    //     ctx.beginPath();
    //     ctx.lineWidth = 1;
    //     ctx.strokeStyle = 'rgb(154, 143, 126)';
    //     ctx.moveTo(x, y);
    //     ctx.lineTo(x+w, y);
    //     ctx.stroke();
    // }

    function window_inner_layer_wtrfd(x, y, w, h){
        ctx.fillStyle = base_color;
        //ctx.fillStyle = 'red';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.fillRect(x, y, w, h);
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = lighter2;
        ctx.moveTo(x+1, y);
        ctx.lineTo(x+1, y+h);
        ctx.stroke();
    }


    function window_wtrfd(x, y, w, h, count){
        
        window_design_wtrfd(x, y, w, h);

        ctx.save();
        ctx.clip();

        //var grad = rad_grad(win_grad);
        if(count == 0){
            ctx.fillStyle = rad_grad(x, y, w, h, count);
        }
        else if(count==1){
            ctx.fillStyle = rad_grad(x, y, w, h, count);
        }        
        ctx.fillRect(x, y, w, h);
        //ctx.fill();

        // window_design(x-2, y+1, w+2, h+1, 'rgb(92, 62, 39)', 2);
        // window_design(x+1, y-1, w+1, h+2, 'rgb(36, 23, 12)', 3);

        

        ctx.restore();

        decraTrim_wtrfd(x, y+3, w, h);
        
    }
    
    function window_design_wtrfd(x, y, w, h){
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.lineCap = 'butt';
        ctx.strokeStyle = base_color;
        ctx.moveTo(x+6, y+6);
        ctx.lineTo(x+w-8, y+6);
        ctx.lineTo(x+w-8, y+h-6);
        ctx.lineTo(x+6, y+h-6);
        ctx.lineTo(x+6, y+1);
        ctx.stroke();

    }

    function decraTrim_wtrfd(x, y, w, h){
        ctx.strokeStyle = 'transparent';
        ctx.strokeRect(x, y, x+w-40, y+h);
        ctx.stroke();

        for(n=1; n<=5; n++){
            if(n==1){
                hr_line_wtrfd(x+5,y+(stamp_area_h/2)-13, x+45);
            }
            else if(n==5){
                hr_line_wtrfd(x+stamp_area_w-68,y+(stamp_area_h/2)-13, x+stamp_area_w-26);
            }
            else if(n==3){
                hr_line_wtrfd(x+(stamp_area_w/2)-42,y+(stamp_area_h/2)-13, x+(stamp_area_w/2)+18);
            }
            else if(n==2){
                diagonal_lines_wtrfd(x+45, y+(stamp_area_h/2)-13, y+4);
            }
            else if(n==4){
                diagonal_lines_wtrfd(x+(stamp_area_w/2)+18, y+(stamp_area_h/2)-13, y+4);
            }
        }

        function hr_line_wtrfd(x, y, lx){
            ctx.beginPath();
            ctx.lineWidth = 8;
            ctx.lineCap = 'round';
            ctx.strokeStyle = base_color;
            ctx.moveTo(x, y);
            ctx.lineTo(lx, y);
            ctx.stroke();

            hr_shadow_wtrfd(x, y, lx);
        }

        function diagonal_lines_wtrfd(x, mid_y, y){
            ctx.beginPath();            
            ctx.lineWidth = 8;
            ctx.strokeStyle = base_color;
            ctx.moveTo(x, y+40);
            ctx.lineTo(x+42, y);
            ctx.lineTo(x+84, y+40);
            ctx.lineTo(x+42, y+80);
            ctx.lineTo(x, y+40);
            ctx.stroke();

            diagonal_shadow_wtrfd(x, mid_y, y);

        }
        function hr_shadow_wtrfd(x,y, lx){
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = lighter2;
            ctx.moveTo(x, y-3);
            ctx.lineTo(lx, y-3);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = darker2;
            ctx.moveTo(x, y+3);
            ctx.lineTo(lx, y+3);
            ctx.stroke();
        }

        function diagonal_shadow_wtrfd(x, mid_y, y){
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = lighter1;
            // ctx.strokeStyle = 'green';
            ctx.moveTo(x+2, y+36);
            ctx.lineTo(x+38, y+2);
            ctx.moveTo(x+44, y+6);
            ctx.lineTo(x+80, y+40);
            ctx.moveTo(x+80, y+40);
            ctx.lineTo(x+44, y+75);
            ctx.moveTo(x+2, y+44);
            ctx.lineTo(x+38, y+80);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = darker1;
            // ctx.strokeStyle = 'red';
            ctx.moveTo(x+6, y+40);
            ctx.lineTo(x+42, y+6);
            ctx.moveTo(x+45, y);
            ctx.lineTo(x+82, y+36);
            ctx.moveTo(x+84, y+44);
            ctx.lineTo(x+46, y+80);
            ctx.moveTo(x+6, y+40);
            ctx.lineTo(x+40, y+74);
            ctx.stroke();
        }
    }


    // Long Panel Sunray Design-------------------------------------------------

    function window_frame_sunray(x, y, w, h, count){
        ctx.strokeStyle = 'transparent';
        ctx.strokeRect(x, y, w, h);
        ctx.stroke();

        window_base(x, y, w, h);  
        
        window_inner_layer(x+12, y+10, w-24, h-20);

        window(x+12, y+10, w-22, h-20, count);

        for(d=1; d<=2; d++){
            if(count==0){
                frame_triangles(x+20, y+20, x+(w/2)+10, x+65, h, count);
            }
            else if(count==1){
                frame_triangles(x+w-22, y+20, x+w-(w/2), x+w-65, h, count);
            }
            
        }
        

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = lighter2;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y+h);
        ctx.stroke();


        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = lighter2;
        ctx.moveTo(x+w-8, y+6);
        ctx.lineTo(x+w-8, y+h-6);
        ctx.stroke();
        
    }

    function frame_triangles(x, y, lx, qx, h, count){
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = base_color;
        ctx.moveTo(x+2, y);
        ctx.lineTo(lx, y);
        ctx.quadraticCurveTo(qx, y+18, x+2, y+h-60);
        ctx.lineTo(x+2, y);
        ctx.stroke();

        ctx.save();
        ctx.clip();


            ctx.beginPath();
            ctx.lineWidth = 6;
            ctx.shadowColor = 'transparent';
            if(count==0){
                ctx.strokeStyle = lighter2;
            }
            else{
                ctx.strokeStyle = darker1;
            }       
            ctx.moveTo(x+2, y);
            ctx.lineTo(x+2, y+h-60);
            ctx.stroke();
            

            ctx.beginPath();
            if(count==1){
                ctx.strokeStyle = lighter2;
            }
            else if (count==0){
                ctx.strokeStyle = darker1;            
            }        
            ctx.moveTo(lx, y);
            ctx.quadraticCurveTo(qx, y+18, x+2, y+h-60);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = lighter1;
            ctx.moveTo(x+4,y);
            ctx.lineTo(lx-20, y);
            ctx.stroke();      


        ctx.restore();
    }

    function window_base(x, y, w, h){
        ctx.beginPath();
        ctx.moveTo(x+2, y+2);
        ctx.lineTo(x+w-4, y+2);
        ctx.lineTo(x+w-4, y+h-4);
        ctx.lineTo(x+2, y+h-4);

        

        
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 0.5;
        ctx.shadowBlur = 2;
        ctx.shadowColor = darker2;
        ctx.strokeStyle = base_color;
        ctx.strokeRect(x+3, y+3, w-7, h-6);
        ctx.stroke();
    }

    
    function window_inner_layer(x, y, w, h){
        ctx.fillStyle = base_color;
        //ctx.fillStyle = 'red';
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 4;
        ctx.shadowColor = darker1;
        // ctx.shadowColor = 'red';
        ctx.fillRect(x, y, w, h);
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = lighter2;
        // ctx.strokeStyle = 'red';
        ctx.moveTo(x+1, y);
        ctx.lineTo(x+1, y+h);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = darker1;
        // ctx.strokeStyle = 'red';
        if(count==0){            
            ctx.moveTo(x+6, y+4);
            ctx.lineTo(x+6, y+h-4);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = darker1;
        // ctx.strokeStyle = 'red';
        ctx.moveTo(x+6, y+4);
        ctx.lineTo(x+w-5, y+4);
        ctx.stroke();
        
    }

   


    function window(x, y, w, h, count){
        window_design(x, y, w-2, h, base_color, 8, count);        

        ctx.save();
        ctx.clip();
        
            // Gradients
            if(count == 0){
                ctx.fillStyle = rad_grad(x, y, w, h, count);
            }
            else if(count==1){
                ctx.fillStyle = rad_grad(x, y, w, h, count);
            }        
            ctx.fillRect(x, y, w, h);

            // Decra trim
            if(count==0){
                decraTrim(x, y, w, h, x+w, count);
            }
            else{
                decraTrim(x+w, y, w, h, x, count);
            }

        ctx.restore();

        

        if(count==0){
            wd_shadow(x+w-6, y+4, y+h-24);
        }
        else{
            wd_shadow(x+w-6, y+4, y+h-16);
        }

        function wd_shadow(x,y1, y2){
            ctx.beginPath();
            ctx.shadowColor = 'transparent';
            ctx.lineWidth = 3;
            ctx.strokeStyle = lighter2;
            // ctx.strokeStyle = 'red';
            ctx.moveTo(x, y1);
            ctx.lineTo(x, y2);
            ctx.stroke();
        }
        
        window_shadow(x, y, w-2, h, 2, count);

        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = lighter1;
        // ctx.strokeStyle = 'red';
        if(count==1){            
            ctx.moveTo(x+6, y+4);
            ctx.lineTo(x+6, y+h-23);
            ctx.stroke();
        }       
        
    }

    function decraTrim(x, y, w, h, end_x, count){
        
        for(q=1; q<3; q++){
            dt_lines(x, y, end_x, q);
            if(count==0){
                x = x+80;
            }
            else{
                x = x-200;
            }
            
        }

        function dt_lines(sx, y, ex, dt_count){
            ctx.beginPath();
            ctx.lineWidth = 7;
            ctx.strokeStyle = base_color;
            if(dt_count==1){  
                        
                ctx.moveTo(sx+10, y+35);
                ctx.lineTo(ex, y+h-5);                     
                ctx.stroke();
                if(count==1){                    
                    dt_line_shadow(sx+30, y+30, ex, y+h-7);
                }
                else{
                    dt_line_shadow(sx+30, y+36, ex, y+h-7);
                }
                
            }
            else if(dt_count==2){
                ctx.moveTo(sx+50, y-30);
                ctx.lineTo(ex, y+h-10);                     
                ctx.stroke();
                if(count==1){
                    dt_line_shadow(sx+40, y-25, ex, y+h-13 );
                }
                else{
                    dt_line_shadow(sx+102, y, ex-6, y+h-20 );
                }
                
            } 
        }
        function dt_line_shadow(sh_x, sh_y, sh_lx, sh_ly){
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = darker1;
            // ctx.strokeStyle = 'red';
            ctx.moveTo(sh_x, sh_y);
            ctx.lineTo(sh_lx, sh_ly);
            ctx.stroke();

        }
        
    }
    
    function window_design(x, y, w, h, clr, stroke, count){
        ctx.beginPath();
        ctx.lineWidth = stroke;
        ctx.strokeStyle = clr;
        // ctx.strokeStyle = 'red';
        ctx.shadowColor = 'transparent';
        if(count==0){
            ctx.moveTo(x+6, y+h);
            ctx.bezierCurveTo(x+4, y+48, x+w-150, y+5, x+w-4, y+4);
            ctx.lineTo(x+w-4, y+h-25);
            ctx.bezierCurveTo(x+w-24, y+h-20, x+w-25, y+h-15, x+w-30, y+h-4);
            ctx.lineTo(x+6, y+h-4);
        }
        else if(count==1){
            ctx.moveTo(x+w-4, y+h);
            ctx.bezierCurveTo(x+w, y+50, x+160, y+5, x+5, y+4);
            ctx.lineTo(x+5, y+h-25);
            ctx.bezierCurveTo(x+20, y+h-20, x+25, y+h-15, x+30, y+h-4);
            ctx.lineTo(x+w-4, y+h-4);
        }
        ctx.stroke();

        
    }

    function window_shadow(x, y, w, h, stroke, count){
        
        if(count==0){
            ctx.beginPath();
            ctx.lineWidth = stroke;
            ctx.strokeStyle = lighter1;
            // ctx.strokeStyle = 'red';
            ctx.moveTo(x+3, y+h-8);
            ctx.bezierCurveTo(x+12, y+53, x+w-210, y+16, x+w-80, y+4);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = darker1;
            // ctx.strokeStyle = 'green';
            ctx.moveTo(x+w, y+h-21);
            ctx.bezierCurveTo(x+w-20, y+78, x+w-20, y+h-10, x+w-25, y+h);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = lighter1;
            // ctx.strokeStyle = 'green';
            ctx.moveTo(x+w-4, y+h-25);
            ctx.bezierCurveTo(x+w-24, y+76, x+w-22, y+h-12, x+w-28, y+h-4);
            ctx.stroke();
            
        }
        else if(count==1){
            ctx.beginPath();
            ctx.lineWidth = stroke;
            ctx.strokeStyle = darker1;
            // ctx.strokeStyle = 'yellow';
            ctx.moveTo(x+w-5, y+h-15);
            ctx.bezierCurveTo(x+w-14, y+54, x+210, y+14, x+85, y+4);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = lighter1;
            // ctx.strokeStyle = 'red';
            ctx.moveTo(x, y+h-21);
            ctx.bezierCurveTo(x+20, y+h-16, x+20, y+h-10, x+25, y+h);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = darker1;
            // ctx.strokeStyle = 'red';
            ctx.moveTo(x+5, y+h-24);
            ctx.bezierCurveTo(x+25, y+h-17, x+25, y+h-11, x+29, y+h-3);
            ctx.stroke();
        }      

        
    }


    // ===============================================================Short Panel windows
    // ------------------------------------sp_ darkTint/clear/frost design-------------------------------

    function shortPanel_darkTint(margin_y){
        // windows(margin_y);
        for(i=0; i<4; i++){
            windows_SPDrktnt(margin_x, margin_y, stamp_area_short_w, stamp_area_h, i);
        }


        function windows_SPDrktnt(margin_x, margin_y, window_w, window_h, count){
            var frame_x = (margin_x+(count*window_w)+(count*margin_x));
            if(count>=0 && count<=3){
                window_frame_SPDrktnt(frame_x);
                inner_frame_SPDrktnt(frame_x+13, margin_y+13, window_w-27, window_h-27);

                if(count==0 || count==1){                    
                    if(selectedWindow =='sp_cathedral'){
                        glassFrame_cathedral(frame_x, margin_y, margin_x+window_w-21, margin_y+20, count);    
                    }
                    else{
                        glass_frame_SPDrktnt(frame_x+18, margin_y+window_h-20, frame_x+window_w-21, margin_y+20, count);
                    }
                    
                    
                }
                else if(count==2 || count==3){
                    // glassFrame_cathedral(frame_x+18, margin_y+window_h-20, frame_x+window_w-21, margin_y+20, count);
                    if(selectedWindow == 'sp_cathedral'){
                        glassFrame_cathedral(frame_x, margin_y, margin_x+window_w-21, margin_y+20, count);
                    }
                    else{
                        glass_frame_SPDrktnt(frame_x+18, margin_y+window_h-20, frame_x+window_w-21, margin_y+20, count);
                    }
                }
            }

            function glass_frame_SPDrktnt(frame_x, frame_y, end_x, end_y, count){
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'transparent';
                ctx.moveTo(frame_x, frame_y);
                ctx.lineTo(frame_x, end_y);
                ctx.lineTo(end_x, end_y);
                ctx.lineTo(end_x, frame_y);
                ctx.lineTo(frame_x, frame_y);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                    if(count==0){
                        // ctx.fillStyle = rad_grad(win_grad_l0);
                        ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                    }
                    else if(count==1){
                        // ctx.fillStyle = rad_grad(win_grad_l1);
                        ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                    }
                    else if(count==2){
                        // ctx.fillStyle = rad_grad(win_grad_r0);
                        ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                    }
                    else if(count==3){
                        // ctx.fillStyle = rad_grad(win_grad_r1);
                        ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                    }                
                    ctx.fillRect(frame_x, end_y, window_w, window_h);
                    ctx.fill();

                ctx.restore();
            }

            // --------------------------------- short cathedral code
            function glassFrame_cathedral(frame_x, frame_y, window_w, h, count){
        
                window_design(frame_x, frame_y, window_w, window_h, base_color, 1);
        
                ctx.save();
                ctx.clip();
        
                //var grad = rad_grad(win_grad);
                if(count==0){
                    // ctx.fillStyle = rad_grad(win_grad_l0);
                    ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                }
                else if(count==1){
                    // ctx.fillStyle = rad_grad(win_grad_l1);
                    ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                }
                else if(count==2){
                    // ctx.fillStyle = rad_grad(win_grad_r0);
                    ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                }
                else if(count==3){
                    // ctx.fillStyle = rad_grad(win_grad_r1);
                    ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                }        
                ctx.fillRect(frame_x, frame_y, window_w, window_h);
                //ctx.fill();
        
                window_design(frame_x-2, frame_y+1, window_w+2, window_h+1, darker2, 3);
                window_design(frame_x+1, frame_y-1, window_w+1, window_h+2, lighter2, 3);
        
                
        
                ctx.restore();
                
            }
            
            function window_design(x, y, w, h, stroke, lw){
                ctx.beginPath();
                ctx.lineWidth = lw;
                ctx.strokeStyle = stroke;
                ctx.moveTo(x+20, y+h-22);
                ctx.lineTo(x+w-16, y+h-22);
                ctx.lineTo(x+w-16, y+h-50);
                ctx.lineTo(x+w-28, y+h-50);
                ctx.quadraticCurveTo(x+w-28, y+50, x+w-40, y+h-65);
                ctx.quadraticCurveTo(x+w/2, y, x+44, y+h-65);
                ctx.quadraticCurveTo(x+32, y+50, x+32, y+h-50);
                // ctx.quadraticCurveTo(x+12, y+60, x+12, y+h-20);
                ctx.lineTo(x+20, y+h-50);
                ctx.lineTo(x+20, y+h-22);
                ctx.stroke();

                // ctx.moveTo(x+20, y+h-20);
                // ctx.lineTo(x+w-20, y+h-20);
                // ctx.lineTo(x+w-20, y+h-40);
                // ctx.lineTo(x+w-12, y+h-20);
                // ctx.quadraticCurveTo(x+w-12, y+60, x+w-30, y+h-35);
                // ctx.quadraticCurveTo(x+w/2, y-45, x+30, y+h-35);
                // ctx.quadraticCurveTo(x+12, y+60, x+12, y+h-20);
                // ctx.lineTo(x+2, y+h-20);
                // ctx.lineTo(x+2, y+h-4);
                // ctx.stroke();
        
                
                
            }

            function inner_frame_SPDrktnt(inner_x, inner_y, frame_width, frame_height){
                // outer layer for clipping
                ctx.lineWidth = 1;
                ctx.strokeStyle = base_color;
                ctx.rect(inner_x, inner_y, frame_width, frame_height);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                // section under clipping
                ctx.lineWidth = 8;
                ctx.strokeStyle = darker1;
                // ctx.strokeStyle = 'white';
                ctx.strokeRect(inner_x, inner_y, frame_width, frame_height);

                //left shadow_light
                dark_shadow_SPDrktnt(inner_x, inner_y, inner_y+frame_height, 2, lighter2, 'ls');
                dark_shadow_SPDrktnt(inner_x+2, inner_y+2, inner_y+frame_height-2,2, lighter1, 'ls');
                //left shadow_dark
                dark_shadow_SPDrktnt(inner_x+3, inner_y+3, inner_y+frame_height-3, 1, darker1, 'ls');
                dark_shadow_SPDrktnt(inner_x+5, inner_y+5, inner_y+frame_height-5,1, darker1, 'ls');

                //right shadow_light
                dark_shadow_SPDrktnt(inner_x+frame_width-5, inner_y+5, inner_y+frame_height-5, 2, lighter1, 'ls');
                dark_shadow_SPDrktnt(inner_x+frame_width-4, inner_y-3, inner_y+frame_height-3,1, lighter1, 'ls');
                //right shadow_dark
                dark_shadow_SPDrktnt(inner_x+frame_width-2, inner_y+2, inner_y+frame_height-2, 2, darker1, 'ls');
                dark_shadow_SPDrktnt(inner_x+frame_width, inner_y, inner_y+frame_height,2, darker2, 'ls');

                // top_shadow_dark
                dark_shadow_SPDrktnt(inner_x, inner_y, inner_x+frame_width, 2, darker1, 'ts');
                dark_shadow_SPDrktnt(inner_x+1, inner_y+2, inner_x+frame_width-2, 1, darker1, 'ts');
                // top_shadow_light
                dark_shadow_SPDrktnt(inner_x+5, inner_y+5, inner_x+frame_width-5, 1, lighter1, 'ts');
                dark_shadow_SPDrktnt(inner_x+3, inner_y+4, inner_x+frame_width-4, 2, lighter1, 'ts');

                // bottom_shadow_light
                dark_shadow_SPDrktnt(inner_x+5, inner_y+frame_height-5, inner_x+frame_width-5, 2, lighter1, 'ts');
                dark_shadow_SPDrktnt(inner_x+3, inner_y+frame_height-3, inner_x+frame_width-3, 1, lighter1, 'ts');
                // bottom_shadow_dark
                dark_shadow_SPDrktnt(inner_x+2, inner_y+frame_height-3, inner_x+frame_width-2, 2, darker1, 'ts');
                dark_shadow_SPDrktnt(inner_x, inner_y+frame_height-1, inner_x+frame_width, 1, darker2, 'ts');
                

                ctx.restore();
            }

            function window_frame_SPDrktnt(x){
                // base rectangle
                ctx.fillStyle = '#9a8f7e';
                ctx.fillStyle = base_color;
                ctx.fillRect(x, margin_y, window_w, window_h);

                // outer layer for clipping
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'transparent';
                ctx.rect(x, margin_y, window_w, window_h);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                // section under clipping
                ctx.lineWidth = 16;
                ctx.strokeStyle = '#9e9383';
                ctx.strokeStyle = base_color;
                ctx.strokeRect(x, margin_y, window_w, window_h);

                //left shadow_dark
                dark_shadow_SPDrktnt(x+8, margin_y+8, margin_y+window_h-8, 2, darker2, 'ls');
                dark_shadow_SPDrktnt(x+6, margin_y+6, margin_y+window_h-6,2, darker1, 'ls');
                // left shadow_light
                dark_shadow_SPDrktnt(x, margin_y, margin_y+window_h, 4, lighter2, 'ls');
                dark_shadow_SPDrktnt(x+2, margin_y+2, margin_y+window_h-2, 1, lighter1, 'ls');

                //right shadow_light
                dark_shadow_SPDrktnt(x+window_w-8, margin_y+8, margin_y+window_h-7, 2, lighter2, 'ls');
                dark_shadow_SPDrktnt(x+window_w-6, margin_y+6, margin_y+window_h-5,1, lighter1, 'ls');
                //right shadow_dark
                dark_shadow_SPDrktnt(x+window_w-2, margin_y+2, margin_y+window_h-2, 2, darker1, 'ls');
                dark_shadow_SPDrktnt(x+window_w, margin_y, margin_y+window_h,3, darker2, 'ls');

                // top_shadow_dark
                dark_shadow_SPDrktnt(x+6, margin_y+6, x+window_w-6, 2, darker1, 'ts');
                dark_shadow_SPDrktnt(x+8, margin_y+8, x+window_w-8, 2, darker2, 'ts');
                // top_shadow_light
                dark_shadow_SPDrktnt(x+2, margin_y+2, x+window_w-2, 2, lighter1, 'ts');
                dark_shadow_SPDrktnt(x, margin_y, x+window_w, 2, lighter1, 'ts');

                // bottom shadow_dark
                dark_shadow_SPDrktnt(x+2, margin_y+window_h-4, x+window_w-2, 2, darker1, 'ts');
                dark_shadow_SPDrktnt(x, margin_y+window_h-2, x+window_w, 2, darker2, 'ts');
                // bottom shadow_light
                dark_shadow_SPDrktnt(x+8, margin_y+window_h-8, x+window_w-8, 2, lighter1, 'ts');
                dark_shadow_SPDrktnt(x+6, margin_y+window_h-6, x+window_w-6, 1, lighter1, 'ts');

                ctx.restore();
            }
            function dark_shadow_SPDrktnt(x, y, l_xy, lw, shadow, shadow_orientation){
                ctx.beginPath();
                ctx.lineWidth = lw;
                ctx.strokeStyle = shadow;
                ctx.moveTo(x, y);
                if(shadow_orientation == 'ls'){                    
                    ctx.lineTo(x, l_xy);
                }
                else if(shadow_orientation == 'ts'){                    
                    ctx.lineTo(l_xy, y);
                }
                ctx.stroke();
            }
        }

        
    }





    // -------------------------------------------------------- Short panel Decra Glasses

    function shortPanel_decraGlasses(margin_y){
        // windows(margin_y);
        for(i=0; i<4; i++){
            windows_spDecraGlass(margin_x, margin_y, stamp_area_short_w, stamp_area_h, i);
        }


        function windows_spDecraGlass(margin_x, margin_y, window_w, window_h, count){
            var frame_x = (margin_x+(count*window_w)+(count*margin_x));
            if(count>=0 && count<=3){
                window_frame_SPDrktnt(frame_x);
                inner_frame_SPDrktnt(frame_x+13, margin_y+13, window_w-27, window_h-27);

                if(count==0 || count==1){ 
                    glass_frame_SPDrktnt(frame_x+18, margin_y+window_h-20, frame_x+window_w-21, margin_y+20, count);
                }
                else if(count==2 || count==3){
                    glass_frame_SPDrktnt(frame_x+18, margin_y+window_h-20, frame_x+window_w-21, margin_y+20, count);
                }
            }

            function glass_frame_SPDrktnt(frame_x, frame_y, end_x, end_y, count){
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'transparent';
                ctx.moveTo(frame_x, frame_y);
                ctx.lineTo(frame_x, end_y);
                ctx.lineTo(end_x, end_y);
                ctx.lineTo(end_x, frame_y);
                ctx.lineTo(frame_x, frame_y);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                selectedspdecraglass = selectedWindow;

                if(selectedspdecraglass == 'victorian'){
                    pic = "static/images/sp_decraglasses/SP_Victorian.png";
                }
                else if(selectedspdecraglass == 'riviera'){
                    pic = "sp_decraglasses/SP_Riviera.png";
                }
                else if(selectedspdecraglass == 'chalet'){
                    pic = "sp_decraglasses/SP_Chalet.png";
                }
                else if(selectedspdecraglass == 'americana'){
                    pic = "sp_decraglasses/SP_Americana.png";
                }
                else if(selectedspdecraglass == 'heartland'){
                    pic = "sp_decraglasses/SP_Heartland.png";
                }
                else if(selectedspdecraglass == 'mission'){
                    pic = "sp_decraglasses/SP_Mission.png";
                }
                else if(selectedspdecraglass == 'prairie'){
                    pic = "sp_decraglasses/SP_Prairie.png";
                }
                else if(selectedspdecraglass == 'jardin'){
                    pic = "sp_decraglasses/SP_Jardin.png";
                }
                else if(selectedspdecraglass == 'trellis'){
                    pic = "sp_decraglasses/SP_Trellis.png";
                }

                // if(count>=0 || count<=3){
                    

                // }
                // else if(count==2 || count==3){
                //     console.log(count);
                //     //ctx.fillStyle = rad_grad(win_grad_r);
                // }
                decra_glass(pic, frame_x-9, frame_y-85);                
                ctx.fillRect(frame_x, end_y, window_w, window_h);
                ctx.fill();

                ctx.restore();
            }

            function decra_glass(pic, x, y){
                console.log('decra_glass');
                decragls_img1 = new Image();
                decragls_img1.src = pic;
                decragls_img1.onload = function(){
                    ctx.drawImage(decragls_img1, x, y);
                }
            }

            // --------------------------------- short cathedral code
            function glassFrame_cathedral(frame_x, frame_y, window_w, h, count){
        
                window_design(frame_x, frame_y, window_w, window_h, base_color, 1);
        
                ctx.save();
                ctx.clip();
        
                //var grad = rad_grad(win_grad);
                if(count==0){
                    // ctx.fillStyle = rad_grad(win_grad_l0);
                    ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                }
                else if(count==1){
                    // ctx.fillStyle = rad_grad(win_grad_l1);
                    ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                }
                else if(count==2){
                    // ctx.fillStyle = rad_grad(win_grad_r0);
                    ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                }
                else if(count==3){
                    // ctx.fillStyle = rad_grad(win_grad_r1);
                    ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                }        
                ctx.fillRect(frame_x, frame_y, window_w, window_h);
                //ctx.fill();
        
                window_design(frame_x-2, frame_y+1, window_w+2, window_h+1, darker2, 3);
                window_design(frame_x+1, frame_y-1, window_w+1, window_h+2, lighter2, 3);
        
                
        
                ctx.restore();
                
            }
            
            function window_design(x, y, w, h, stroke, lw){
                ctx.beginPath();
                ctx.lineWidth = lw;
                ctx.strokeStyle = stroke;
                ctx.moveTo(x+20, y+h-22);
                ctx.lineTo(x+w-16, y+h-22);
                ctx.lineTo(x+w-16, y+h-50);
                ctx.lineTo(x+w-28, y+h-50);
                ctx.quadraticCurveTo(x+w-28, y+50, x+w-40, y+h-65);
                ctx.quadraticCurveTo(x+w/2, y, x+44, y+h-65);
                ctx.quadraticCurveTo(x+32, y+50, x+32, y+h-50);
                // ctx.quadraticCurveTo(x+12, y+60, x+12, y+h-20);
                ctx.lineTo(x+20, y+h-50);
                ctx.lineTo(x+20, y+h-22);
                ctx.stroke();

                // ctx.moveTo(x+20, y+h-20);
                // ctx.lineTo(x+w-20, y+h-20);
                // ctx.lineTo(x+w-20, y+h-40);
                // ctx.lineTo(x+w-12, y+h-20);
                // ctx.quadraticCurveTo(x+w-12, y+60, x+w-30, y+h-35);
                // ctx.quadraticCurveTo(x+w/2, y-45, x+30, y+h-35);
                // ctx.quadraticCurveTo(x+12, y+60, x+12, y+h-20);
                // ctx.lineTo(x+2, y+h-20);
                // ctx.lineTo(x+2, y+h-4);
                // ctx.stroke();
        
                
                
            }

            function inner_frame_SPDrktnt(inner_x, inner_y, frame_width, frame_height){
                // outer layer for clipping
                ctx.lineWidth = 1;
                ctx.strokeStyle = base_color;
                ctx.rect(inner_x, inner_y, frame_width, frame_height);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                // section under clipping
                ctx.lineWidth = 8;
                ctx.strokeStyle = darker1;
                // ctx.strokeStyle = 'white';
                ctx.strokeRect(inner_x, inner_y, frame_width, frame_height);

                //left shadow_light
                dark_shadow_SPDrktnt(inner_x, inner_y, inner_y+frame_height, 2, lighter2, 'ls');
                dark_shadow_SPDrktnt(inner_x+2, inner_y+2, inner_y+frame_height-2,2, lighter1, 'ls');
                //left shadow_dark
                dark_shadow_SPDrktnt(inner_x+3, inner_y+3, inner_y+frame_height-3, 1, darker1, 'ls');
                dark_shadow_SPDrktnt(inner_x+5, inner_y+5, inner_y+frame_height-5,1, darker1, 'ls');

                //right shadow_light
                dark_shadow_SPDrktnt(inner_x+frame_width-5, inner_y+5, inner_y+frame_height-5, 2, lighter1, 'ls');
                dark_shadow_SPDrktnt(inner_x+frame_width-4, inner_y-3, inner_y+frame_height-3,1, lighter1, 'ls');
                //right shadow_dark
                dark_shadow_SPDrktnt(inner_x+frame_width-2, inner_y+2, inner_y+frame_height-2, 2, darker1, 'ls');
                dark_shadow_SPDrktnt(inner_x+frame_width, inner_y, inner_y+frame_height,2, darker2, 'ls');

                // top_shadow_dark
                dark_shadow_SPDrktnt(inner_x, inner_y, inner_x+frame_width, 2, darker1, 'ts');
                dark_shadow_SPDrktnt(inner_x+1, inner_y+2, inner_x+frame_width-2, 1, darker1, 'ts');
                // top_shadow_light
                dark_shadow_SPDrktnt(inner_x+5, inner_y+5, inner_x+frame_width-5, 1, lighter1, 'ts');
                dark_shadow_SPDrktnt(inner_x+3, inner_y+4, inner_x+frame_width-4, 2, lighter1, 'ts');

                // bottom_shadow_light
                dark_shadow_SPDrktnt(inner_x+5, inner_y+frame_height-5, inner_x+frame_width-5, 2, lighter1, 'ts');
                dark_shadow_SPDrktnt(inner_x+3, inner_y+frame_height-3, inner_x+frame_width-3, 1, lighter1, 'ts');
                // bottom_shadow_dark
                dark_shadow_SPDrktnt(inner_x+2, inner_y+frame_height-3, inner_x+frame_width-2, 2, darker1, 'ts');
                dark_shadow_SPDrktnt(inner_x, inner_y+frame_height-1, inner_x+frame_width, 1, darker2, 'ts');
                

                ctx.restore();
            }

            function window_frame_SPDrktnt(x){
                // base rectangle
                ctx.fillStyle = '#9a8f7e';
                ctx.fillStyle = base_color;
                ctx.fillRect(x, margin_y, window_w, window_h);

                // outer layer for clipping
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'transparent';
                ctx.rect(x, margin_y, window_w, window_h);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                // section under clipping
                ctx.lineWidth = 16;
                ctx.strokeStyle = '#9e9383';
                ctx.strokeStyle = base_color;
                ctx.strokeRect(x, margin_y, window_w, window_h);

                //left shadow_dark
                dark_shadow_SPDrktnt(x+8, margin_y+8, margin_y+window_h-8, 2, darker2, 'ls');
                dark_shadow_SPDrktnt(x+6, margin_y+6, margin_y+window_h-6,2, darker1, 'ls');
                // left shadow_light
                dark_shadow_SPDrktnt(x, margin_y, margin_y+window_h, 4, lighter2, 'ls');
                dark_shadow_SPDrktnt(x+2, margin_y+2, margin_y+window_h-2, 1, lighter1, 'ls');

                //right shadow_light
                dark_shadow_SPDrktnt(x+window_w-8, margin_y+8, margin_y+window_h-7, 2, lighter2, 'ls');
                dark_shadow_SPDrktnt(x+window_w-6, margin_y+6, margin_y+window_h-5,1, lighter1, 'ls');
                //right shadow_dark
                dark_shadow_SPDrktnt(x+window_w-2, margin_y+2, margin_y+window_h-2, 2, darker1, 'ls');
                dark_shadow_SPDrktnt(x+window_w, margin_y, margin_y+window_h,3, darker2, 'ls');

                // top_shadow_dark
                dark_shadow_SPDrktnt(x+6, margin_y+6, x+window_w-6, 2, darker1, 'ts');
                dark_shadow_SPDrktnt(x+8, margin_y+8, x+window_w-8, 2, darker2, 'ts');
                // top_shadow_light
                dark_shadow_SPDrktnt(x+2, margin_y+2, x+window_w-2, 2, lighter1, 'ts');
                dark_shadow_SPDrktnt(x, margin_y, x+window_w, 2, lighter1, 'ts');

                // bottom shadow_dark
                dark_shadow_SPDrktnt(x+2, margin_y+window_h-4, x+window_w-2, 2, darker1, 'ts');
                dark_shadow_SPDrktnt(x, margin_y+window_h-2, x+window_w, 2, darker2, 'ts');
                // bottom shadow_light
                dark_shadow_SPDrktnt(x+8, margin_y+window_h-8, x+window_w-8, 2, lighter1, 'ts');
                dark_shadow_SPDrktnt(x+6, margin_y+window_h-6, x+window_w-6, 1, lighter1, 'ts');

                ctx.restore();
            }
            function dark_shadow_SPDrktnt(x, y, l_xy, lw, shadow, shadow_orientation){
                ctx.beginPath();
                ctx.lineWidth = lw;
                ctx.strokeStyle = shadow;
                ctx.moveTo(x, y);
                if(shadow_orientation == 'ls'){                    
                    ctx.lineTo(x, l_xy);
                }
                else if(shadow_orientation == 'ts'){                    
                    ctx.lineTo(l_xy, y);
                }
                ctx.stroke();
            }
        }

        
    }


    // -------------------------------------------------------short panel Wagon Wheel

    function shortPanel_wagonWheel(margin_y){
        
        for(i=0; i<4; i++){   
            
            var frame_x = (margin_x+(i*stamp_area_short_w)+(i*margin_x));      
            window_base(frame_x, margin_y, stamp_area_short_w, stamp_area_h);    
            window_inner_layer(frame_x+11, margin_y+11, stamp_area_short_w-24, stamp_area_h-22); 
            windows_wagonWheel(frame_x, margin_y, stamp_area_short_w-15, stamp_area_h-16, i);

            
        }

        function frame_triangles(x, y, lx, qx, h, count){

            ctx.beginPath();
            
            ctx.fillStyle = lighter1;
            
            
            ctx.moveTo(x, y);
            ctx.lineTo(lx, y); 
            if(count==0|| count==2){
                ctx.lineTo(lx-10, y+3);           
            }
            else{
                ctx.lineTo(lx+12, y+3);           
            }            
            ctx.lineTo(x+2, y+3);
            ctx.fill();

            ctx.beginPath();
            if(count==0 || count==2){
                ctx.fillStyle = lighter1;
            }
            else{
                ctx.fillStyle = darker1;
            }
            ctx.moveTo(x, y);
            ctx.lineTo(x+3, y+3); 
            ctx.lineTo(x+3, y+h-60);           
            ctx.lineTo(x, y+h-50);
            ctx.fill();

            ctx.beginPath();
            if(count==0||count==2){
                ctx.fillStyle = darker1;
            }
            else{
                ctx.fillStyle = lighter1;
            }
            
            ctx.moveTo(x, y+h-50);
            if(count==0|| count==2){
                ctx.lineTo(x+3, y+h-60); 
                ctx.quadraticCurveTo(x+30, y+12, lx-10, y+3);  
                ctx.lineTo(lx, y);        
                ctx.quadraticCurveTo(lx-60, y+25, x, y+h-50);          
            }
            else{
                ctx.lineTo(x-3, y+h-60);
                ctx.quadraticCurveTo(x-30, y+12, lx+12, y+3);  
                ctx.lineTo(lx, y);        
                ctx.quadraticCurveTo(lx+60, y+20, x, y+h-50);          
            }
            
            ctx.fill();
    
            
        }


        function windows_wagonWheel(x, y, w, h, ww_count){
            //     var frame_x = (x+(ww_count*w)+(ww_count*x));
            window_design(frame_x+7, y+8, w-2, h, base_color, 4, ww_count);   
                
            for(d=1; d<=2; d++){
                if(ww_count==0 || ww_count==2){
                    frame_triangles(x+20, y+20, x+(w/2)+10, x+65, h, ww_count);
                }
                else if(ww_count==1 || ww_count==3){
                    frame_triangles(x+w-8, y+20, x+w-(w/2), x+w-65, h, ww_count);
                }
                
            }
                
        }

        function window_design(x, y, w, h, clr, stroke, ww_count){            
            console.log('wagon wheel', ww_count);

            ctx.beginPath();
            ctx.lineWidth = stroke;
            ctx.strokeStyle = clr;
            // ctx.strokeStyle = 'red';
            ctx.shadowColor = 'transparent';
            if(ww_count==0 || ww_count==2){
                ctx.moveTo(x+8, y+h-8);
                ctx.bezierCurveTo(x+12, y+h-48, x+w-78, y+10, x+w-9, y+8);
                ctx.lineTo(x+w-9, y+h-25);
                ctx.bezierCurveTo(x+w-24, y+h-20, x+w-25, y+h-15, x+w-30, y+h-6);
                ctx.lineTo(x+8, y+h-6);
            }
            else if(ww_count==1 || ww_count == 3){
                ctx.moveTo(x+w-8, y+h-8);
                ctx.bezierCurveTo(x+w-15, y+h-46, x+76, y+12, x+9, y+8);
                ctx.lineTo(x+9, y+h-25);
                ctx.bezierCurveTo(x+24, y+h-20, x+25, y+h-15, x+30, y+h-6);
                ctx.lineTo(x+w-8, y+h-6);
            }
            ctx.stroke();

            ctx.save();
            ctx.clip();
            
                // Gradients
                if(count==0){
                    ctx.fillStyle = rad_grad(x, y, w, h, ww_count);
                }
                else if(count==1){
                    ctx.fillStyle = rad_grad(x, y, w, h, ww_count);
                }
                else if(count==2){
                    ctx.fillStyle = rad_grad(x, y, w, h, ww_count);
                }
                else if(count==3){
                    ctx.fillStyle = rad_grad(x, y, w, h, ww_count);
                }                 
                ctx.fillRect(x, y, w, h);
                ctx.fill();

                // Decra trim
                if(ww_count==0 || ww_count == 2){
                    decraTrim(x, y, w, h, x+w, ww_count);
                }
                else if(ww_count==1 || ww_count == 3){
                    decraTrim(x+w, y, w, h, x, ww_count);
                }

            ctx.restore();
    
            window_shadow(x, y, w, h, ww_count);
        }

        function decraTrim(x, y, w, h, end_x, count){
        
            for(q=1; q<3; q++){
                dt_lines(x, y, end_x, q);
                if(count==0 || count==2){
                    x = x+40;
                }
                else{
                    x = x-130;
                }
                
            }
    
            function dt_lines(sx, y, ex, dt_count){
                ctx.beginPath();
                ctx.lineWidth = 7;
                ctx.strokeStyle = base_color;
                if(dt_count==1){                              
                    ctx.moveTo(sx, y+30);
                    ctx.lineTo(ex, y+h-3);                     
                    ctx.stroke();
                    // if(count==1){                    
                    //     dt_line_shadow(sx+30, y+30, ex, y+h-7);
                    // }
                    // else{
                    //     dt_line_shadow(sx+30, y+36, ex, y+h-7);
                    // }
                    
                }
                else if(dt_count==2){
                    ctx.moveTo(sx+50, y);
                    ctx.lineTo(ex, y+h);                     
                    ctx.stroke();
                    // if(count==1){
                    //     dt_line_shadow(sx+40, y-25, ex, y+h-13 );
                    // }
                    // else{
                    //     dt_line_shadow(sx+102, y, ex-6, y+h-20 );
                    // }
                    
                } 
            }
            function dt_line_shadow(sh_x, sh_y, sh_lx, sh_ly){
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                // ctx.strokeStyle = 'red';
                ctx.moveTo(sh_x, sh_y);
                ctx.lineTo(sh_lx, sh_ly);
                ctx.stroke();
    
            }
            
        }

        function window_shadow(x, y, w, h, ww_count){
            
            if(ww_count==0 || ww_count==2){
                console.log(ww_count);
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = lighter1;
                ctx.moveTo(x+8, y+h-20);
                ctx.bezierCurveTo(x+18, y+h-50, x+w-90, y+15, x+w-43, y+7);
                ctx.stroke();

                ctx.beginPath();
                ctx.strokeStyle = darker1;
                ctx.moveTo(x+8, y+h-8);
                ctx.bezierCurveTo(x+18, y+h-55, x+w-60, y+8, x+w-8, y+7);
                ctx.stroke();

                // -----------------Ray corner

                ctx.beginPath();
                ctx.lineWidth = 4;
                ctx.strokeStyle = base_color;
                ctx.moveTo(x+w-4, y+h-23);
                ctx.bezierCurveTo(x+w-23, y+h-18, x+w-23, y+h-13, x+w-28, y+h-4);
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = lighter1;
                ctx.moveTo(x+w-7, y+h-25);
                ctx.bezierCurveTo(x+w-24, y+h-20, x+w-24, y+h-15, x+w-30, y+h-6);
                ctx.stroke();

                ctx.beginPath();
                ctx.strokeStyle = darker1;
                ctx.moveTo(x+w-2, y+h-21);
                ctx.bezierCurveTo(x+w-20, y+h-17, x+w-20, y+h-12, x+w-24, y+h-6);
                ctx.stroke();
            }
            else if(ww_count==1 || ww_count == 3){ 
                console.log(ww_count);
                ctx.beginPath();
                ctx.lineWidth = 2;               
                ctx.strokeStyle = darker1;
                ctx.moveTo(x+w-8, y+h-20);
                ctx.bezierCurveTo(x+w-18, y+h-50, x+90, y+15, x+30, y+7);
                ctx.stroke();

                ctx.beginPath();
                ctx.strokeStyle = lighter1;
                ctx.moveTo(x+w-8, y+h-8);
                ctx.bezierCurveTo(x+w-18, y+h-53, x+70, y+14, x+8, y+7);
                ctx.stroke();

                // -----------------Ray corner

                ctx.beginPath();
                ctx.lineWidth = 4;
                ctx.strokeStyle = base_color;
                ctx.moveTo(x+4, y+h-23);
                ctx.bezierCurveTo(x+23, y+h-18, x+23, y+h-13, x+28, y+h-4);
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = darker1;
                ctx.moveTo(x+7, y+h-25);
                ctx.bezierCurveTo(x+24, y+h-20, x+24, y+h-15, x+30, y+h-6);
                ctx.stroke();

                ctx.beginPath();
                ctx.strokeStyle = lighter1;
                ctx.moveTo(x+2, y+h-21);
                ctx.bezierCurveTo(x+20, y+h-17, x+20, y+h-12, x+24, y+h-6);
                ctx.stroke();
            }
        }

        function window_base(x, y, w, h){
            ctx.beginPath();
            ctx.moveTo(x+2, y+2);
            ctx.lineTo(x+w-4, y+2);
            ctx.lineTo(x+w-4, y+h-4);
            ctx.lineTo(x+2, y+h-4);           
    
            
            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 0.1;
            ctx.shadowBlur = 2;
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.strokeStyle = base_color;
            // ctx.strokeStyle = 'red';
            ctx.strokeRect(x+3, y+3, w-7, h-6);
            ctx.stroke();

            // left shadow
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.shadowColor = 'transparent';
            ctx.strokeStyle = lighter2;
            // ctx.strokeStyle = 'red';
            ctx.moveTo(x, y);
            ctx.lineTo(x, y+h);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.shadowColor = 'transparent';
            ctx.strokeStyle = darker1;
            // ctx.strokeStyle = 'red';
            ctx.moveTo(x+4, y+4);
            ctx.lineTo(x+4, y+h-4);
            ctx.stroke();

            // right shadow
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.shadowColor = 'transparent';
            ctx.strokeStyle = darker1;
            // ctx.strokeStyle = 'red';
            ctx.moveTo(x+w, y);
            ctx.lineTo(x+w, y+h);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.shadowColor = 'transparent';
            ctx.strokeStyle = lighter1;
            // ctx.strokeStyle = 'red';
            ctx.moveTo(x+w-7, y+4);
            ctx.lineTo(x+w-7, y+h-4);
            ctx.stroke();
        }

        function window_inner_layer(x, y, w, h){
            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = base_color;
            // ctx.strokeStyle = 'green';            
            // ctx.shadowColor = 'red';
            ctx.strokeRect(x, y, w, h);
            ctx.stroke();
    
            // -----------------------------left shadow
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.shadowColor = 'transparent';
            ctx.strokeStyle = '#f3f4f1';
            ctx.strokeStyle = lighter2;
            ctx.moveTo(x-1, y-2);
            ctx.lineTo(x-1, y+h+2);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.shadowColor = 'transparent';
            ctx.strokeStyle = '#f3f4f1';
            ctx.strokeStyle = darker1;
            ctx.moveTo(x+4, y+2);
            ctx.lineTo(x+4, y+h-2);
            ctx.stroke();
    
            // ----------------------------------------right shadow
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = lighter1;
            // ctx.strokeStyle = 'red';
            ctx.moveTo(x+w-4, y+4);
            ctx.lineTo(x+w-4, y+h-4);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = darker2;
            // ctx.strokeStyle = 'red';
            ctx.moveTo(x+w+1, y-2);
            ctx.lineTo(x+w+1, y+h+2);
            ctx.stroke();
    
            // ----------------------------top shadow
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = lighter1;
            // ctx.strokeStyle = 'white';
            ctx.moveTo(x, y-1);
            ctx.lineTo(x+w, y-1);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = darker1;
            // ctx.strokeStyle = 'white';
            ctx.moveTo(x+4, y+4);
            ctx.lineTo(x+w-4, y+4);
            ctx.stroke();

            // ----------------------------bottom shadow
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = darker2;
            // ctx.strokeStyle = 'white';
            ctx.moveTo(x-1, y+h+2);
            ctx.lineTo(x+w+1, y+h+2);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = lighter1;
            // ctx.strokeStyle = 'white';
            ctx.moveTo(x+4, y+h-3);
            ctx.lineTo(x+w-4, y+h-3);
            ctx.stroke();
            
        }

        


        
    }


    // ------------------------------------------------------short panel stockton

    
    function shortPanel_stockton(margin_y){
        for(i=0; i<4; i++){
            windows_stockton(margin_x, margin_y, stamp_area_short_w, stamp_area_h, i);
        }

        function windows_stockton(margin_x, margin_y, window_w, window_h, count){
            var frame_x = (margin_x+(count*window_w)+(count*margin_x));
            if(count>=0 && count<=3){
                window_frame_SPStckn(frame_x);
                inner_frame_SPStckn(frame_x+13, margin_y+13, window_w-27, window_h-27);

                if(count==0 || count==1){                    
                    glass_frame_SPStckn(frame_x+18, margin_y+window_h-20, frame_x+window_w-21, margin_y+20, count);
                    
                }
                else if(count==2 || count==3){
                    glass_frame_SPStckn(frame_x+18, margin_y+window_h-20, frame_x+window_w-21, margin_y+20, count);
                    
                }
            }
            
            function glass_frame_SPStckn(frame_x, frame_y, end_x, end_y, count){
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'transparent';
                ctx.moveTo(frame_x, frame_y);
                ctx.lineTo(frame_x, end_y);
                ctx.lineTo(end_x, end_y);
                ctx.lineTo(end_x, frame_y);
                ctx.lineTo(frame_x, frame_y);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                    if(count==0){
                        ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                    }
                    else if(count==1){
                        ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                    }
                    else if(count==2){
                        ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                    }
                    else if(count==3){
                        ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                    }                 
                    ctx.fillRect(frame_x, end_y, window_w, window_h);
                    ctx.fill();

                    if(selectedWindow == 'sp_stockton'){
                        decraTrim_SPStckn(frame_x, end_y, window_w, window_h);
                    }
                    else if(selectedWindow =='sp_prairie'){
                        decraTrim_SPPrre(frame_x, end_y, window_w, window_h);
                    }
                    else if(selectedWindow =='sp_waterford'){
                        decraTrim_wtrfd(frame_x, end_y, window_w, window_h);
                    }
                    
                ctx.restore();
            }

            
            function inner_frame_SPStckn(inner_x, inner_y, frame_width, frame_height){
                // outer layer for clipping
                ctx.lineWidth = 1;
                ctx.strokeStyle = base_color;
                ctx.rect(inner_x, inner_y, frame_width, frame_height);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                // section under clipping
                ctx.lineWidth = 8;
                ctx.strokeStyle = base_color;
                ctx.strokeRect(inner_x, inner_y, frame_width, frame_height);

                //left shadow_light
                dark_shadow_SPStckn(inner_x, inner_y, inner_y+frame_height, 2, lighter2, 'ls');
                dark_shadow_SPStckn(inner_x+2, inner_y+2, inner_y+frame_height-2,2, lighter1, 'ls');
                //left shadow_dark
                dark_shadow_SPStckn(inner_x+3, inner_y+3, inner_y+frame_height-3, 1, darker2, 'ls');
                dark_shadow_SPStckn(inner_x+5, inner_y+5, inner_y+frame_height-5,1, darker1, 'ls');

                //right shadow_light
                dark_shadow_SPStckn(inner_x+frame_width-5, inner_y+5, inner_y+frame_height-5, 2, lighter2, 'ls');
                dark_shadow_SPStckn(inner_x+frame_width-4, inner_y-3, inner_y+frame_height-3,1, lighter1, 'ls');
                //right shadow_dark
                dark_shadow_SPStckn(inner_x+frame_width-2, inner_y+2, inner_y+frame_height-2, 2, darker1, 'ls');
                dark_shadow_SPStckn(inner_x+frame_width, inner_y, inner_y+frame_height,2, darker2, 'ls');

                // top_shadow_dark
                dark_shadow_SPStckn(inner_x, inner_y, inner_x+frame_width, 2, lighter2, 'ts');
                dark_shadow_SPStckn(inner_x+2, inner_y+2, inner_x+frame_width-2, 1, lighter1, 'ts');
                // top_shadow_light
                dark_shadow_SPStckn(inner_x+5, inner_y+5, inner_x+frame_width-5, 1, darker2, 'ts');
                dark_shadow_SPStckn(inner_x+3, inner_y+4, inner_x+frame_width-4, 2, darker1, 'ts');

                // bottom_shadow_light
                dark_shadow_SPStckn(inner_x+5, inner_y+frame_height-5, inner_x+frame_width-5, 2, lighter2, 'ts');
                dark_shadow_SPStckn(inner_x+3, inner_y+frame_height-3, inner_x+frame_width-3, 1, lighter1, 'ts');
                // bottom_shadow_dark
                dark_shadow_SPStckn(inner_x+2, inner_y+frame_height-3, inner_x+frame_width-2, 2, darker1, 'ts');
                dark_shadow_SPStckn(inner_x, inner_y+frame_height-1, inner_x+frame_width, 1, darker2, 'ts');
                

                ctx.restore();
            }

            function window_frame_SPStckn(x){
                // base rectangle
                ctx.fillStyle = base_color;
                ctx.fillRect(x, margin_y, window_w, window_h);

                // outer layer for clipping
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'transparent';
                ctx.rect(x, margin_y, window_w, window_h);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                // section under clipping
                ctx.lineWidth = 16;
                ctx.strokeStyle = base_color;
                // ctx.strokeStyle = 'white';
                ctx.strokeRect(x, margin_y, window_w, window_h);

                //left shadow_dark
                dark_shadow_SPStckn(x+8, margin_y+8, margin_y+window_h-8, 2, darker2, 'ls');
                dark_shadow_SPStckn(x+6, margin_y+6, margin_y+window_h-6,2, darker1, 'ls');
                // left shadow_light
                dark_shadow_SPStckn(x, margin_y, margin_y+window_h, 2, lighter2, 'ls');
                dark_shadow_SPStckn(x+2, margin_y+2, margin_y+window_h-2, 2, lighter1, 'ls');

                //right shadow_light
                dark_shadow_SPStckn(x+window_w-8, margin_y+8, margin_y+window_h-7, 2, lighter2, 'ls');
                dark_shadow_SPStckn(x+window_w-6, margin_y+6, margin_y+window_h-5,1, lighter1, 'ls');
                //right shadow_dark
                dark_shadow_SPStckn(x+window_w-2, margin_y+2, margin_y+window_h-2, 2, darker1, 'ls');
                dark_shadow_SPStckn(x+window_w, margin_y, margin_y+window_h,2, darker2, 'ls');

                // top_shadow_dark
                dark_shadow_SPStckn(x+6, margin_y+6, x+window_w-6, 2, darker1, 'ts');
                dark_shadow_SPStckn(x+8, margin_y+8, x+window_w-8, 2, darker2, 'ts');
                // top_shadow_light
                dark_shadow_SPStckn(x+2, margin_y+2, x+window_w-2, 2, lighter1, 'ts');
                dark_shadow_SPStckn(x, margin_y, x+window_w, 2, lighter2, 'ts');

                // bottom shadow_dark
                dark_shadow_SPStckn(x+2, margin_y+window_h-4, x+window_w-2, 2, darker1, 'ts');
                dark_shadow_SPStckn(x, margin_y+window_h-2, x+window_w, 2, darker2, 'ts');
                // bottom shadow_light
                dark_shadow_SPStckn(x+8, margin_y+window_h-8, x+window_w-8, 2, lighter2, 'ts');
                dark_shadow_SPStckn(x+6, margin_y+window_h-6, x+window_w-6, 1, lighter1, 'ts');

                ctx.restore();
            }
            
            function dark_shadow_SPStckn(x, y, l_xy, lw, shadow, shadow_orientation){
                ctx.beginPath();
                ctx.lineWidth = lw;
                ctx.strokeStyle = shadow;
                ctx.moveTo(x, y);
                if(shadow_orientation == 'ls'){                    
                    ctx.lineTo(x, l_xy);
                }
                else if(shadow_orientation == 'ts'){                    
                    ctx.lineTo(l_xy, y);
                }
                ctx.stroke();
            }



            function decraTrim_SPStckn(x, y, w, h){
                for(k=y-5; k<=(y+h); k+=44.5){
                    ctx.beginPath();
                    ctx.lineWidth = 5;
                    ctx.shadowColor = 'transparent';
                    ctx.lineCap = 'round';
                    ctx.strokeStyle = base_color;
                    ctx.moveTo(x, k);
                    ctx.lineTo(x+w, k);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                    ctx.lineWidth = 2;
                    ctx.moveTo(x, k+1.5);
                    ctx.lineTo(x+w, k+1.5);
                    ctx.stroke();
                }
                for(m = w/2+15; m<(x+w); m+=w/2+7){
                    ctx.beginPath();
                    ctx.shadowColor = 'transparent';
                    ctx.strokeStyle = base_color;
                    ctx.lineWidth = 5;
                    ctx.lineCap = 'round';
                    ctx.moveTo(m, y+3);
                    ctx.lineTo(m, y+h-10);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                    ctx.lineWidth = 2;
                    ctx.moveTo(m+2, y+3);
                    ctx.lineTo(m+2, y+h-10);
                    ctx.stroke();
                }
            }


            function decraTrim_SPPrre(x, y, w, h){
                for(k=y-5; k<=(y+h); k+=28.5){
                    ctx.beginPath();
                    ctx.lineWidth = 5;
                    ctx.shadowColor = 'transparent';
                    ctx.lineCap = 'round';
                    ctx.strokeStyle = base_color;
                    ctx.moveTo(x, k);
                    ctx.lineTo(x+w, k);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                    ctx.lineWidth = 2;
                    ctx.moveTo(x, k+1.5);
                    ctx.lineTo(x+w, k+1.5);
                    ctx.stroke();
                }
                for(m = x-25; m<(x+w); m+=w/3+8){
                    ctx.beginPath();
                    ctx.shadowColor = 'transparent';
                    ctx.strokeStyle = base_color;
                    ctx.lineWidth = 5;
                    ctx.lineCap = 'round';
                    ctx.moveTo(m-6, y+3);
                    ctx.lineTo(m-6, y+h-10);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                    ctx.lineWidth = 2;
                    ctx.moveTo(m-4, y+3);
                    ctx.lineTo(m-4, y+h-10);
                    ctx.stroke();
                }
            }


            function decraTrim_wtrfd(x, y, w, h){
                ctx.strokeStyle = 'transparent';
                ctx.strokeRect(x, y, x+w-40, y+h);
                ctx.stroke();
        
                for(n=1; n<=3; n++){
                    if(n==1){
                        hr_line_wtrfd(x, y+36, x+30);
                    }
                    else if(n==3){
                        hr_line_wtrfd(x+w-41, y+36, x+w-70);
                    }
                    else if(n==2){
                        diagonal_lines_wtrfd(x+33, y);
                    }
                }
        
                function hr_line_wtrfd(x, y, lx){
                    ctx.beginPath();
                    ctx.lineWidth = 8;
                    ctx.lineCap = 'round';
                    ctx.strokeStyle = base_color;
                    ctx.moveTo(x, y);
                    ctx.lineTo(lx, y);
                    ctx.stroke();
        
                    hr_shadow_wtrfd(x, y, lx);
                }

                function hr_shadow_wtrfd(x,y, lx){
                    ctx.beginPath();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = lighter2;
                    ctx.moveTo(x, y-3);
                    ctx.lineTo(lx, y-3);
                    ctx.stroke();
        
                    ctx.beginPath();
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = darker2;
                    ctx.moveTo(x, y+3);
                    ctx.lineTo(lx, y+3);
                    ctx.stroke();
                }
        
                function diagonal_lines_wtrfd(x, y){
                    ctx.beginPath();            
                    ctx.lineWidth = 8;
                    ctx.strokeStyle = base_color;
                    ctx.moveTo(x, y+36);
                    ctx.lineTo(x+38, y);
                    ctx.lineTo(x+76, y+36);
                    ctx.lineTo(x+38, y+74);
                    ctx.lineTo(x, y+36);
                    ctx.stroke();
        
                    diagonal_shadow_wtrfd(x, y);
        
                }                
        
                function diagonal_shadow_wtrfd(x, y){
                    ctx.beginPath();
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = lighter1;
                    // ctx.strokeStyle = 'green';
                    ctx.moveTo(x, y+32);
                    ctx.lineTo(x+32, y+2);
                    ctx.moveTo(x+40, y+6);
                    ctx.lineTo(x+72, y+36);

                    ctx.moveTo(x+72, y+36);
                    ctx.lineTo(x+40, y+68);
                    ctx.moveTo(x, y+40);
                    ctx.lineTo(x+38, y+78);
                    ctx.stroke();
        
                    ctx.beginPath();
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = darker2;
                    // ctx.strokeStyle = 'blue';
                    ctx.moveTo(x+6, y+36);
                    ctx.lineTo(x+38, y+6);
                    ctx.moveTo(x+42, y);
                    ctx.lineTo(x+80, y+36);
                    ctx.moveTo(x+80, y+36);
                    ctx.lineTo(x+40, y+78);
                    ctx.moveTo(x+6, y+38);
                    ctx.lineTo(x+36, y+68);
                    ctx.stroke();
                }
            }

        }
    }


    // -------------------------------------------------------Short panel Cascade

    

    function shortPanel_cascade(margin_y){
        for(i=0; i<4; i++){
            windows_cascade(margin_x, margin_y, stamp_area_short_w, stamp_area_h,i);
        }

        function windows_cascade(margin_x, margin_y, window_w, window_h, count){
            var frame_x = (margin_x+(count*window_w)+(count*margin_x));
            if(count>=0 || count<=3){
                window_frame_SPCasd(frame_x);
                inner_frame_SPCasd(frame_x+13, margin_y+13, window_w-27, window_h-27);

                if(count==0 || count==1){                    
                    glass_frame_SPCasd(frame_x+19, margin_y+window_h-20, frame_x+window_w+55, margin_y+40, frame_x+window_w-55, margin_y+40, frame_x+window_w-21, margin_y+40, count);
                    
                }
                else if(count==2 || count==3){
                    //glass_frame(frame_x+18, margin_y+window_h-20, frame_x+window_w-19, margin_y+(window_h/2), frame_x+44, margin_y+32, frame_x+19, margin_y+31, count);
                    glass_frame_SPCasd(frame_x+19, margin_y+window_h-20, frame_x+window_w+55, margin_y+40, frame_x+window_w-55, margin_y+40, frame_x+window_w-21, margin_y+40, count);
                    
                }
            }

            function glass_frame_SPCasd(frame_x, frame_y, bc_x1, bc_y1, bc_x2, bc_y2, end_x, end_y, count){
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'transparent';
                ctx.moveTo(frame_x, frame_y);
                ctx.lineTo(frame_x, end_y);
                ctx.bezierCurveTo(bc_x1-175, bc_y1-21, bc_x2-5, bc_y2-21, end_x, end_y);
                ctx.lineTo(end_x, frame_y);
                ctx.lineTo(frame_x, frame_y);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                if(count==0){
                    // ctx.fillStyle = rad_grad(win_grad_l0);
                    ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                }
                else if(count==1){
                    // ctx.fillStyle = rad_grad(win_grad_l1);
                    ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                }
                else if(count==2){
                    // ctx.fillStyle = rad_grad(win_grad_r0);
                    ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                }
                else if(count==3){
                    // ctx.fillStyle = rad_grad(win_grad_r1);
                    ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                }                
                    ctx.fillRect(frame_x, end_y, window_w, window_h);
                    ctx.fill();

                    decraTrim_SPCasd(frame_x, end_y, window_w, window_h);

                ctx.restore();
            }

            function inner_frame_SPCasd(inner_x, inner_y, frame_width, frame_height){
                // outer layer for clipping
                ctx.lineWidth = 1;
                ctx.strokeStyle = base_color;
                ctx.rect(inner_x, inner_y, frame_width, frame_height);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                // section under clipping
                ctx.lineWidth = 8;
                ctx.strokeStyle = base_color;
                // ctx.strokeStyle = 'white';
                ctx.strokeRect(inner_x, inner_y, frame_width, frame_height);

                //left shadow_light
                dark_shadow_SPCasd(inner_x, inner_y, inner_y+frame_height, 2, lighter2, 'ls');
                dark_shadow_SPCasd(inner_x+2, inner_y+2, inner_y+frame_height-2,2, lighter1, 'ls');
                //left shadow_dark
                dark_shadow_SPCasd(inner_x+3, inner_y+3, inner_y+frame_height-3, 1, darker1, 'ls');
                dark_shadow_SPCasd(inner_x+5, inner_y+5, inner_y+frame_height-5,1, darker2, 'ls');

                //right shadow_light
                dark_shadow_SPCasd(inner_x+frame_width-5, inner_y+5, inner_y+frame_height-5, 2, lighter2, 'ls');
                dark_shadow_SPCasd(inner_x+frame_width-4, inner_y-3, inner_y+frame_height-3,1, lighter1, 'ls');
                //right shadow_dark
                dark_shadow_SPCasd(inner_x+frame_width-2, inner_y+2, inner_y+frame_height-2, 2, darker1, 'ls');
                dark_shadow_SPCasd(inner_x+frame_width, inner_y, inner_y+frame_height,2, darker2, 'ls');

                // top_shadow_dark
                dark_shadow_SPCasd(inner_x, inner_y, inner_x+frame_width, 2, darker1, 'ts');
                dark_shadow_SPCasd(inner_x+2, inner_y+2, inner_x+frame_width-2, 1, darker1, 'ts');
                // top_shadow_light
                dark_shadow_SPCasd(inner_x+5, inner_y+5, inner_x+frame_width-5, 1, lighter2, 'ts');
                dark_shadow_SPCasd(inner_x+3, inner_y+4, inner_x+frame_width-4, 2, lighter1, 'ts');

                // bottom_shadow_light
                dark_shadow_SPCasd(inner_x+5, inner_y+frame_height-5, inner_x+frame_width-5, 2, lighter2, 'ts');
                dark_shadow_SPCasd(inner_x+3, inner_y+frame_height-3, inner_x+frame_width-3, 1, lighter1, 'ts');
                // bottom_shadow_dark
                dark_shadow_SPCasd(inner_x+2, inner_y+frame_height-3, inner_x+frame_width-2, 2, darker1, 'ts');
                dark_shadow_SPCasd(inner_x, inner_y+frame_height-1, inner_x+frame_width, 1, darker2, 'ts');
                

                ctx.restore();
            }

            function window_frame_SPCasd(x){
                // base rectangle
                ctx.fillStyle = base_color;
                ctx.fillRect(x, margin_y, window_w, window_h);

                // outer layer for clipping
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'transparent';
                ctx.rect(x, margin_y, window_w, window_h);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                // section under clipping
                ctx.lineWidth = 16;
                ctx.strokeStyle = base_color;
                // ctx.strokeStyle = 'white';
                ctx.strokeRect(x, margin_y, window_w, window_h);

                //left shadow_dark
                dark_shadow_SPCasd(x+8, margin_y+8, margin_y+window_h-8, 2, darker2, 'ls');
                dark_shadow_SPCasd(x+6, margin_y+6, margin_y+window_h-6,2, darker1, 'ls');
                // left shadow_light
                dark_shadow_SPCasd(x, margin_y, margin_y+window_h, 2, lighter2, 'ls');
                dark_shadow_SPCasd(x+2, margin_y+2, margin_y+window_h-2, 1, lighter1, 'ls');

                //right shadow_light
                dark_shadow_SPCasd(x+window_w-8, margin_y+8, margin_y+window_h-7, 2, lighter2, 'ls');
                dark_shadow_SPCasd(x+window_w-6, margin_y+6, margin_y+window_h-5,1, lighter1, 'ls');
                //right shadow_dark
                dark_shadow_SPCasd(x+window_w-2, margin_y+2, margin_y+window_h-2, 2, darker1, 'ls');
                dark_shadow_SPCasd(x+window_w, margin_y, margin_y+window_h,2, darker2, 'ls');

                // top_shadow_dark
                dark_shadow_SPCasd(x+6, margin_y+6, x+window_w-6, 2, darker1, 'ts');
                dark_shadow_SPCasd(x+8, margin_y+8, x+window_w-8, 2, darker2, 'ts');
                // top_shadow_light
                dark_shadow_SPCasd(x+2, margin_y+2, x+window_w-2, 2, lighter1, 'ts');
                dark_shadow_SPCasd(x, margin_y, x+window_w, 2, lighter2, 'ts');

                // bottom shadow_dark
                dark_shadow_SPCasd(x+2, margin_y+window_h-4, x+window_w-2, 2, darker1, 'ts');
                dark_shadow_SPCasd(x, margin_y+window_h-2, x+window_w, 2, darker2, 'ts');
                // bottom shadow_light
                dark_shadow_SPCasd(x+8, margin_y+window_h-8, x+window_w-8, 2, lighter2, 'ts');
                dark_shadow_SPCasd(x+6, margin_y+window_h-6, x+window_w-6, 1, lighter1, 'ts');

                ctx.restore();
            }
            function dark_shadow_SPCasd(x, y, l_xy, lw, shadow, shadow_orientation){
                ctx.beginPath();
                ctx.lineWidth = lw;
                ctx.strokeStyle = shadow;
                ctx.moveTo(x, y);
                if(shadow_orientation == 'ls'){                    
                    ctx.lineTo(x, l_xy);
                }
                else if(shadow_orientation == 'ts'){                    
                    ctx.lineTo(l_xy, y);
                }
                ctx.stroke();
            }

            function decraTrim_SPCasd(x, y, w, h){
                for(k=y; k<=(y+h); k+=43.5){
                    ctx.beginPath();
                    ctx.lineWidth = 5;
                    ctx.shadowColor = 'transparent';
                    ctx.lineCap = 'round';
                    ctx.strokeStyle = base_color;
                    ctx.moveTo(x, k-20);
                    ctx.lineTo(x+w, k-20);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                    ctx.lineWidth = 2;
                    ctx.moveTo(x, k+21.5);
                    ctx.lineTo(x+w, k+21.5);
                    ctx.stroke();
                }

                for(m = x; m<(x+w); m+=w/2-30){
                    ctx.beginPath();
                    ctx.shadowColor = 'transparent';
                    ctx.strokeStyle = base_color;
                    ctx.lineWidth = 5;
                    ctx.lineCap = 'round';
                    ctx.moveTo(m+40, y-12);
                    ctx.lineTo(m+40, y+h-10);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                    ctx.lineWidth = 2;
                    ctx.moveTo(m+42, y+3);
                    ctx.lineTo(m+42, y+h-10);
                    ctx.stroke();
                }
            }
        }
    }





    // ------------------------------------------------Short panel Sunray

    function shortPanel_sunray(margin_y){
        // windows(margin_y);
        for(i=0; i<4; i++){
            windows_sunray(margin_x, margin_y, stamp_area_short_w, stamp_area_h, i);
        }

        function windows_sunray(margin_x, margin_y, window_w, window_h, count){
            var frame_x = (margin_x+(count*window_w)+(count*margin_x));
            if(count==0 || count==3){
                window_frame(frame_x);
                inner_frame(frame_x+13, margin_y+13, window_w-27, window_h-27);

                if(count==0){                    
                    glass_frame(frame_x+18, margin_y+window_h-20, frame_x+18, margin_y+(window_h/2), frame_x+window_w-45, margin_y+32, frame_x+window_w-21, margin_y+31, count);
                    frame_shadow(frame_x+18, margin_y+window_h-30, frame_x+24, margin_y+(window_h/2), frame_x+window_w-45, margin_y+32, frame_x+window_w-21, margin_y+31, count);

                    dt_center(frame_x+window_w-22, margin_y+window_h-55, frame_x+(window_w/2)-2, margin_y+49, 1);
                    
                    frame_triangle(frame_x+24, margin_y+24, window_w, window_h, count);
                }
                else if(count==3){
                    glass_frame(frame_x+window_w-19, margin_y+window_h-20, frame_x+window_w-19, margin_y+(window_h/2), frame_x+44, margin_y+32, frame_x+19, margin_y+31, count);
                    frame_shadow(frame_x+window_w-19, margin_y+window_h-30, frame_x+window_w-24, margin_y+(window_h/2), frame_x+44, margin_y+32, frame_x+20, margin_y+31, count);

                    dt_center(frame_x+20, margin_y+window_h-55, frame_x+(window_w/2), margin_y+49, 6);

                    frame_triangle(frame_x, margin_y, window_w, window_h, count);
                }
            }
            else if(count==1 || count==2){
                window_frame(frame_x);
                inner_frame(frame_x+13, margin_y+13, window_w-27, window_h-27);

                if(count==1){
                    glass_frame_1(frame_x+19, margin_y+26, frame_x+24, margin_y+22, frame_x+window_w-35, margin_y+18, frame_x+window_w-19, margin_y+19, window_h, count);
                    frame_shadow(frame_x+18, margin_y+24, frame_x+24, margin_y+22, frame_x+window_w-35, margin_y+18, frame_x+window_w-19, margin_y+19, count);
                    ray_shadow(frame_x+window_w-20, margin_y+window_h-40, frame_x+window_w-30, margin_y+window_h-37, frame_x+window_w-35, margin_y+window_h-35, frame_x+window_w-40, margin_y+window_h-20, count);

                    dt_center(frame_x+window_w-41, margin_y+window_h-28, frame_x+20, margin_y+window_h-46, 2);
                    dt_center(frame_x+window_w-32, margin_y+window_h-38, frame_x+(window_w/2)+10, margin_y+23, 3);
                }
                else if(count==2){
                    glass_frame_1(frame_x+window_w-19, margin_y+25, frame_x+window_w-19, margin_y+24, frame_x+35, margin_y+18, frame_x+18, margin_y+20, window_h, count);
                    frame_shadow(frame_x+window_w-18, margin_y+24, frame_x+window_w-24, margin_y+22, frame_x+35, margin_y+18, frame_x+18, margin_y+18, count);
                    ray_shadow(frame_x+20, margin_y+window_h-40, frame_x+30, margin_y+window_h-37, frame_x+35, margin_y+window_h-35, frame_x+40, margin_y+window_h-20, count);

                    dt_center(frame_x+41, margin_y+window_h-28, frame_x+window_w-20, margin_y+window_h-46), 4;
                    dt_center(frame_x+32, margin_y+window_h-38, frame_x+(window_w/2), margin_y+23, 5);
                }
            }

            function frame_triangle(x, y, w, h, count){
                v_line(x, y, h);
                hr_line(x, y, w);
                curved_line(x, y, w, h);

                function v_line(x, y, h){
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    if(count==0){                        
                        ctx.fillStyle = lighter2;
                        // ctx.fillStyle = 'red';
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y+(h/2)-15);
                        ctx.lineTo(x+4, y+(h/2)-18);
                        ctx.lineTo(x+4, y);
                    }      
                    else{
                        ctx.fillStyle = darker2;
                        ctx.moveTo(x+w-24, y+24);
                        ctx.lineTo(x+w-24, y+(h/2)+10);
                        ctx.lineTo(x+w-28, y+(h/2)+6);
                        ctx.lineTo(x+w-28, y+24);
                    }              
                    ctx.fill();
                }

                function hr_line(x, y, w){                    
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    if(count==0){
                        ctx.fillStyle = lighter1;
                        ctx.moveTo(x, y);
                        ctx.lineTo(x+w-60, y);
                        ctx.lineTo(x+w-85, y+4);
                        ctx.lineTo(x+4, y+4);
                    }
                    else{
                        ctx.fillStyle = lighter1;
                        ctx.moveTo(x+w-24, y+24);
                        ctx.lineTo(x+35, y+24);
                        ctx.lineTo(x+60, y+28);
                        ctx.lineTo(x+w-28, y+28);
                    }
                    ctx.fill();
                }

                function curved_line(x, y, w, h){
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    if(count==0){
                        ctx.fillStyle = darker2;
                        ctx.moveTo(x, y+(h/2)-14);
                        ctx.quadraticCurveTo(x+15, y+26, x+w-62, y);
                        ctx.lineTo(x+w-74, y);
                        ctx.quadraticCurveTo(x+w-150, y+15, x+4, y+(h/2)-22);
                    }
                    else{
                        ctx.fillStyle = lighter2;
                        ctx.moveTo(x+w-24, y+(h/2)+10);
                        ctx.quadraticCurveTo(x+w-45, y+45, x+42, y+24);
                        ctx.lineTo(x+56, y+25);
                        ctx.quadraticCurveTo(x+120, y+36, x+w-28, y+(h/2)+2);
                    }
                    ctx.fill();
                }
            }

            function dt_center(x, y, lx, ly, num){
                ctx.beginPath();
                ctx.lineWidth = 6;
                ctx.strokeStyle = base_color;
                ctx.moveTo(x, y);
                ctx.lineTo(lx, ly);
                ctx.stroke();
                if(num == 3 || num == 5){
                    dt_shadows(x, y, lx, ly, num);
                }
                else{
                    dt_shadows(x, y, lx, ly, num);
                }
                
            }

            function dt_shadows(x, y, lx, ly, dt_num){
                // light shadow
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = lighter1;
                // ctx.strokeStyle = 'green';
                if(dt_num == 3){
                    ctx.moveTo(x+2, y);
                    ctx.lineTo(lx+1, ly-1);    
                }
                else if(dt_num==5){
                    ctx.moveTo(x-3, y);
                    ctx.lineTo(lx-1, ly-1);
                }
                else{
                    ctx.moveTo(x, y-1);
                    ctx.lineTo(lx, ly-2);
                }
                
                ctx.stroke();

                // dark shadow
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = darker2;
                // ctx.strokeStyle = 'blue';
                if(dt_num == 3){
                    ctx.moveTo(x, y+3);
                    ctx.lineTo(lx-3, ly);
                }
                else if(dt_num == 5){
                    ctx.moveTo(x, y+2);
                    ctx.lineTo(lx, ly+2);
                }
                else{
                    ctx.moveTo(x, y+2);
                    ctx.lineTo(lx, ly+2);
                }
                ctx.stroke();
            }

            function ray_shadow(x, y, bc_x1, bc_y1, bc_x2, bc_y2, end_x, end_y, count){                
                ctx.beginPath();
                ctx.lineWidth = 4;
                ctx.strokeStyle = base_color;                
                // ctx.strokeStyle = 'red';                
                ctx.moveTo(x, y);
                if(count==1){
                    ctx.bezierCurveTo(bc_x1, bc_y1, bc_x2, bc_y2, end_x, end_y);
                }  
                else if(count==2){
                    ctx.bezierCurveTo(bc_x1, bc_y1, bc_x2, bc_y2, end_x, end_y);
                } 
                ctx.stroke();

                // light_shadow
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = lighter1;
                // ctx.strokeStyle = 'green'; 
                if(count==1){               
                    ctx.moveTo(x, y-1);
                    ctx.bezierCurveTo(bc_x1-1, bc_y1-1, bc_x2-1, bc_y2-1, end_x-1, end_y);
                }  
                else if(count==2){               
                    ctx.moveTo(x-1, y-1); 
                    ctx.bezierCurveTo(bc_x1+1, bc_y1-1, bc_x2+1, bc_y2, end_x+1, end_y);
                } 
                ctx.stroke();

                // dark_shadow
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = darker2; 
                // ctx.strokeStyle = 'blue'; 
                if(count==1){               
                    ctx.moveTo(x, y+2);
                    ctx.bezierCurveTo(bc_x1+1, bc_y1+1, bc_x2+1, bc_y2+1, end_x+2, end_y);
                }  
                else if(count==2){             
                    ctx.moveTo(x-1, y+2); 
                    ctx.bezierCurveTo(bc_x1-1, bc_y1+1, bc_x2-1, bc_y2+2, end_x-2, end_y);
                } 
                ctx.stroke();
            }

            function frame_shadow(x, y, bc_x1, bc_y1, bc_x2, bc_y2, end_x, end_y, count){
                ctx.beginPath();
                ctx.lineWidth = 4;
                ctx.lineCap = 'round';
                ctx.strokeStyle = base_color;
                // ctx.strokeStyle = 'green';
                ctx.moveTo(x, y)
                ctx.bezierCurveTo(bc_x1, bc_y1, bc_x2, bc_y2, end_x, end_y);
                ctx.stroke();

                // light_shadow
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = lighter1;
                // ctx.strokeStyle = 'red';
                if(count==0){
                    ctx.moveTo(x-2, y);
                    ctx.bezierCurveTo(bc_x1, bc_y1-1, bc_x2, bc_y2-2, end_x+1, end_y-2);
                }
                if(count==1){
                    ctx.moveTo(x, y-1);
                    ctx.bezierCurveTo(bc_x1, bc_y1-2, bc_x2-30, bc_y2-3, end_x, end_y-4);                    
                }
                if(count==2){
                    ctx.moveTo(x, y-1);
                    ctx.bezierCurveTo(bc_x1, bc_y1-2, bc_x2-30, bc_y2-2, end_x, end_y-2);
                }
                else if(count==3){
                    ctx.moveTo(x+1, y-1);
                    ctx.bezierCurveTo(bc_x1, bc_y1, bc_x2, bc_y2-1, end_x, end_y-1);
                }
                
                ctx.stroke();

                // Dark shadow
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = darker1;
                // ctx.strokeStyle = 'red';
                if(count==0){
                    ctx.moveTo(x+1, y+1);
                    ctx.bezierCurveTo(bc_x1+6, bc_y1+2, bc_x2, bc_y2+1, end_x, end_y+2);
                }
                if(count==1){
                    ctx.moveTo(x+1, y+2);
                    ctx.bezierCurveTo(bc_x1+2, bc_y1+1, bc_x2+30, bc_y2-1, end_x, end_y);
                }
                if(count==2){
                    ctx.moveTo(x+1, y+3);
                    ctx.bezierCurveTo(bc_x1+2, bc_y1+2, bc_x2, bc_y2+2, end_x, end_y+2);
                }
                else if(count==3){
                    ctx.moveTo(x-1, y+2);
                    ctx.bezierCurveTo(bc_x1, bc_y1+2, bc_x2, bc_y2+3, end_x, end_y+2);
                }
                
                ctx.stroke();
            }

            function glass_frame(frame_x, frame_y, bc_x1, bc_y1, bc_x2, bc_y2, end_x, end_y, count){
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'transparent';
                ctx.moveTo(frame_x, frame_y);
                ctx.bezierCurveTo(bc_x1, bc_y1, bc_x2, bc_y2, end_x, end_y);
                ctx.lineTo(end_x, frame_y);
                ctx.lineTo(frame_x, frame_y);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                    if(count == 0){
                        ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                    }
                    else if(count==3){
                        ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                    }  

                                   
                    ctx.fillRect(frame_x, end_y, window_w, window_h);
                    ctx.fill();

                ctx.restore();
            }

            function glass_frame_1(frame_x, frame_y, bc_x1, bc_y1, bc_x2, bc_y2, end_x, end_y, window_h, count){
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'transparent';
                ctx.moveTo(frame_x, frame_y);
                ctx.bezierCurveTo(bc_x1, bc_y1, bc_x2, bc_y2, end_x, end_y);
                ctx.lineTo(end_x, frame_y+window_h-65);
                if(count==1){
                    ctx.bezierCurveTo(end_x-20, frame_y+window_h-65, end_x-20, frame_y+window_h-45, end_x-20, frame_y+window_h-45);
                }  
                else if(count==2){
                    ctx.bezierCurveTo(end_x+20, frame_y+window_h-65, end_x+20, frame_y+window_h-45, end_x+20, frame_y+window_h-45);
                }                
                ctx.lineTo(frame_x, frame_y+window_h-45);
                ctx.lineTo(frame_x, frame_y);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                    if(count == 1){
                        ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                    }
                    else if(count==2){
                        ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                    }  

                                
                    ctx.fillRect(frame_x, end_y, window_w, window_h);
                    ctx.fill();

                ctx.restore();
            }

            function inner_frame(inner_x, inner_y, frame_width, frame_height){
                // outer layer for clipping
                ctx.lineWidth = 1;
                ctx.strokeStyle = base_color;
                ctx.rect(inner_x, inner_y, frame_width, frame_height);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                // section under clipping
                ctx.lineWidth = 8;
                // ctx.strokeStyle = red;
                ctx.strokeStyle = base_color;
                // ctx.strokeStyle = 'red';
                ctx.strokeRect(inner_x, inner_y, frame_width, frame_height);

                //left shadow_light
                dark_shadow(inner_x, inner_y, inner_y+frame_height, 2, lighter2, 'ls');
                dark_shadow(inner_x+2, inner_y+2, inner_y+frame_height-2,2, lighter2, 'ls');
                //left shadow_dark
                dark_shadow(inner_x+3, inner_y+3, inner_y+frame_height-3, 1, darker1, 'ls');
                dark_shadow(inner_x+5, inner_y+5, inner_y+frame_height-5,1, darker2, 'ls');

                //right shadow_light
                dark_shadow(inner_x+frame_width-5, inner_y+5, inner_y+frame_height-5, 2, lighter2, 'ls');
                dark_shadow(inner_x+frame_width-4, inner_y-3, inner_y+frame_height-3,1, lighter1, 'ls');
                //right shadow_dark
                dark_shadow(inner_x+frame_width-2, inner_y+3, inner_y+frame_height-2, 1, darker1, 'ls'); 
                dark_shadow(inner_x+frame_width, inner_y, inner_y+frame_height,2, darker2, 'ls');

                // top_shadow_dark
                dark_shadow(inner_x, inner_y, inner_x+frame_width, 3, lighter2, 'ts');
                dark_shadow(inner_x+2, inner_y+3, inner_x+frame_width-2, 1, lighter1, 'ts');
                // top_shadow_light
                dark_shadow(inner_x+5, inner_y+5, inner_x+frame_width-5, 1, darker2, 'ts');
                dark_shadow(inner_x+3, inner_y+4, inner_x+frame_width-4, 2, darker1, 'ts');

                // bottom_shadow_light
                dark_shadow(inner_x+5, inner_y+frame_height-5, inner_x+frame_width-5, 2, lighter2, 'ts');
                dark_shadow(inner_x+3, inner_y+frame_height-3, inner_x+frame_width-3, 1, lighter1, 'ts');
                // bottom_shadow_dark
                dark_shadow(inner_x+2, inner_y+frame_height-3, inner_x+frame_width-2, 2, darker1, 'ts');
                dark_shadow(inner_x, inner_y+frame_height-1, inner_x+frame_width, 1, darker2, 'ts');
                

                ctx.restore();
            }

            function window_frame(x){
                // base rectangle
                ctx.fillStyle = base_color;
                ctx.fillRect(x, margin_y, window_w, window_h);

                // outer layer for clipping
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'transparent';
                ctx.rect(x, margin_y, window_w, window_h);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                // section under clipping
                ctx.lineWidth = 16;
                ctx.strokeStyle = base_color;
                // ctx.strokeStyle = 'read';
                ctx.strokeRect(x, margin_y, window_w, window_h);

                //left shadow_dark
                dark_shadow(x+8, margin_y+8, margin_y+window_h-8, 2, darker2, 'ls');
                dark_shadow(x+6, margin_y+6, margin_y+window_h-6,2, darker1, 'ls');
                // left shadow_light
                dark_shadow(x, margin_y, margin_y+window_h, 2, lighter1, 'ls');
                dark_shadow(x+2, margin_y+2, margin_y+window_h-2, 1, lighter2, 'ls');

                //right shadow_light
                dark_shadow(x+window_w-8, margin_y+8, margin_y+window_h-7, 2, lighter1, 'ls');
                dark_shadow(x+window_w-6, margin_y+6, margin_y+window_h-5,1, lighter1, 'ls');
                //right shadow_dark
                dark_shadow(x+window_w-2, margin_y+2, margin_y+window_h-2, 2, darker2, 'ls');
                dark_shadow(x+window_w, margin_y, margin_y+window_h,2, darker2,'ls');

                // top_shadow_dark
                dark_shadow(x+6, margin_y+6, x+window_w-6, 2, darker1, 'ts');
                dark_shadow(x+8, margin_y+8, x+window_w-8, 2, darker2, 'ts');
                // top_shadow_light
                dark_shadow(x+2, margin_y+2, x+window_w-2, 2, lighter1, 'ts');
                dark_shadow(x, margin_y, x+window_w, 2, lighter2, 'ts');

                // bottom shadow_dark
                dark_shadow(x+2, margin_y+window_h-4, x+window_w-2, 2, darker1, 'ts');
                dark_shadow(x, margin_y+window_h-2, x+window_w, 2, darker1, 'ts');
                // bottom shadow_light
                dark_shadow(x+8, margin_y+window_h-8, x+window_w-8, 2, lighter1, 'ts');
                dark_shadow(x+6, margin_y+window_h-6, x+window_w-6, 1, lighter1, 'ts');

                ctx.restore();
            }
            function dark_shadow(x, y, l_xy, lw, shadow, shadow_orientation){
                ctx.beginPath();
                ctx.lineWidth = lw;
                ctx.strokeStyle = shadow;
                ctx.moveTo(x, y);
                if(shadow_orientation == 'ls'){                    
                    ctx.lineTo(x, l_xy);
                }
                else if(shadow_orientation == 'ts'){                    
                    ctx.lineTo(l_xy, y);
                }
                ctx.stroke();
            }
        }
    }


    // -------------------------------------- Short Panel Cascade Window

    function sp_cascade(x, margin_y, window_w, window_h, spc_count){
        windows_SPCasd(spc_count);
        

        function windows_SPCasd(count){
            var frame_x = x;
            if(count>=0 || count<=3){
                window_frame_SPCasd(frame_x);
                inner_frame_SPCasd(frame_x+13, margin_y+13, window_w-27, window_h-27);

                if(count==0 || count==1){                    
                    glass_frame_SPCasd(frame_x+19, margin_y+window_h-20, frame_x+window_w+55, margin_y+40, frame_x+window_w-55, margin_y+40, frame_x+window_w-21, margin_y+40, count);
                    
                }
                else if(count==2 || count==3){
                    //glass_frame(frame_x+18, margin_y+window_h-20, frame_x+window_w-19, margin_y+(window_h/2), frame_x+44, margin_y+32, frame_x+19, margin_y+31, count);
                    glass_frame_SPCasd(frame_x+19, margin_y+window_h-20, frame_x+window_w+55, margin_y+40, frame_x+window_w-55, margin_y+40, frame_x+window_w-21, margin_y+40, count);
                    
                }
            }

            function glass_frame_SPCasd(frame_x, frame_y, bc_x1, bc_y1, bc_x2, bc_y2, end_x, end_y, count){
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'transparent';
                ctx.moveTo(frame_x, frame_y);
                ctx.lineTo(frame_x, end_y);
                ctx.bezierCurveTo(bc_x1-175, bc_y1-21, bc_x2-5, bc_y2-21, end_x, end_y);
                ctx.lineTo(end_x, frame_y);
                ctx.lineTo(frame_x, frame_y);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                    if(count == 0 || count ==1){
                        ctx.fillStyle = rad_grad(x, frame_y, window_w, window_h, count);
                    }
                    else if(count==3 || count ==2){
                        ctx.fillStyle = rad_grad(x, frame_y, window_w, window_h, count);
                    }                  
                    ctx.fillRect(frame_x, end_y, window_w, window_h);
                    ctx.fill();

                    decraTrim_SPCasd(frame_x, end_y, window_w, window_h);

                ctx.restore();
            }

            function inner_frame_SPCasd(inner_x, inner_y, frame_width, frame_height){
                // outer layer for clipping
                ctx.lineWidth = 1;
                ctx.strokeStyle = base_color;
                ctx.rect(inner_x, inner_y, frame_width, frame_height);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                // section under clipping
                ctx.lineWidth = 8;
                ctx.strokeStyle = '#9e9383';
                // ctx.strokeStyle = 'white';
                ctx.strokeRect(inner_x, inner_y, frame_width, frame_height);

                //left shadow_light
                dark_shadow_SPCasd(inner_x, inner_y, inner_y+frame_height, 2, '#b0a89b', 'ls');
                dark_shadow_SPCasd(inner_x+2, inner_y+2, inner_y+frame_height-2,2, '#a59b8d', 'ls');
                //left shadow_dark
                dark_shadow_SPCasd(inner_x+3, inner_y+3, inner_y+frame_height-3, 1, '#8f8270', 'ls');
                dark_shadow_SPCasd(inner_x+5, inner_y+5, inner_y+frame_height-5,1, '#817565', 'ls');

                //right shadow_light
                dark_shadow_SPCasd(inner_x+frame_width-5, inner_y+5, inner_y+frame_height-5, 2, '#a59b8d', 'ls');
                dark_shadow_SPCasd(inner_x+frame_width-4, inner_y-3, inner_y+frame_height-3,1, '#a59b8d', 'ls');
                //right shadow_dark
                dark_shadow_SPCasd(inner_x+frame_width-2, inner_y+2, inner_y+frame_height-2, 2, '#968978', 'ls');
                dark_shadow_SPCasd(inner_x+frame_width, inner_y, inner_y+frame_height,2, '#8f8270', 'ls');

                // top_shadow_dark
                dark_shadow_SPCasd(inner_x, inner_y, inner_x+frame_width, 2, '#a59b8d', 'ts');
                dark_shadow_SPCasd(inner_x+2, inner_y+2, inner_x+frame_width-2, 1, '#a59b8d', 'ts');
                // top_shadow_light
                dark_shadow_SPCasd(inner_x+5, inner_y+5, inner_x+frame_width-5, 1, '#8f8270', 'ts');
                dark_shadow_SPCasd(inner_x+3, inner_y+4, inner_x+frame_width-4, 2, '#968978', 'ts');

                // bottom_shadow_light
                dark_shadow_SPCasd(inner_x+5, inner_y+frame_height-5, inner_x+frame_width-5, 2, '#a59b8d', 'ts');
                dark_shadow_SPCasd(inner_x+3, inner_y+frame_height-3, inner_x+frame_width-3, 1, '#a59b8d', 'ts');
                // bottom_shadow_dark
                dark_shadow_SPCasd(inner_x+2, inner_y+frame_height-3, inner_x+frame_width-2, 2, '#968978', 'ts');
                dark_shadow_SPCasd(inner_x, inner_y+frame_height-1, inner_x+frame_width, 1, '#8f8270', 'ts');
                

                ctx.restore();
            }

            function window_frame_SPCasd(x){
                // base rectangle
                ctx.fillStyle = '#9a8f7e';
                ctx.fillRect(x, margin_y, window_w, window_h);

                // outer layer for clipping
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'transparent';
                ctx.rect(x, margin_y, window_w, window_h);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                // section under clipping
                ctx.lineWidth = 16;
                ctx.strokeStyle = '#9e9383';
                // ctx.strokeStyle = 'white';
                ctx.strokeRect(x, margin_y, window_w, window_h);

                //left shadow_dark
                dark_shadow_SPCasd(x+8, margin_y+8, margin_y+window_h-8, 2, '#817565', 'ls');
                dark_shadow_SPCasd(x+6, margin_y+6, margin_y+window_h-6,2, '#8f8270', 'ls');
                // left shadow_light
                dark_shadow_SPCasd(x, margin_y, margin_y+window_h, 2, '#b0a89b', 'ls');
                dark_shadow_SPCasd(x+2, margin_y+2, margin_y+window_h-2, 1, '#b0a89b', 'ls');

                //right shadow_light
                dark_shadow_SPCasd(x+window_w-8, margin_y+8, margin_y+window_h-7, 2, '#b0a89b', 'ls');
                dark_shadow_SPCasd(x+window_w-6, margin_y+6, margin_y+window_h-5,1, '#b0a89b', 'ls');
                //right shadow_dark
                dark_shadow_SPCasd(x+window_w-2, margin_y+2, margin_y+window_h-2, 2, '#968978', 'ls');
                dark_shadow_SPCasd(x+window_w, margin_y, margin_y+window_h,2, '#8f8270', 'ls');

                // top_shadow_dark
                dark_shadow_SPCasd(x+6, margin_y+6, x+window_w-6, 2, '#968978', 'ts');
                dark_shadow_SPCasd(x+8, margin_y+8, x+window_w-8, 2, '#8f8270', 'ts');
                // top_shadow_light
                dark_shadow_SPCasd(x+2, margin_y+2, x+window_w-2, 2, '#a59b8d', 'ts');
                dark_shadow_SPCasd(x, margin_y, x+window_w, 2, '#a59b8d', 'ts');

                // bottom shadow_dark
                dark_shadow_SPCasd(x+2, margin_y+window_h-4, x+window_w-2, 2, '#968978', 'ts');
                dark_shadow_SPCasd(x, margin_y+window_h-2, x+window_w, 2, '#8f8270', 'ts');
                // bottom shadow_light
                dark_shadow_SPCasd(x+8, margin_y+window_h-8, x+window_w-8, 2, '#a59b8d', 'ts');
                dark_shadow_SPCasd(x+6, margin_y+window_h-6, x+window_w-6, 1, '#a59b8d', 'ts');

                ctx.restore();
            }
            function dark_shadow_SPCasd(x, y, l_xy, lw, shadow, shadow_orientation){
                ctx.beginPath();
                ctx.lineWidth = lw;
                ctx.strokeStyle = shadow;
                ctx.moveTo(x, y);
                if(shadow_orientation == 'ls'){                    
                    ctx.lineTo(x, l_xy);
                }
                else if(shadow_orientation == 'ts'){                    
                    ctx.lineTo(l_xy, y);
                }
                ctx.stroke();
            }

            function decraTrim_SPCasd(x, y, w, h){
                for(k=y; k<=(y+h); k+=43.5){
                    ctx.beginPath();
                    ctx.lineWidth = 5;
                    ctx.shadowColor = 'transparent';
                    ctx.lineCap = 'round';
                    ctx.strokeStyle = base_color;
                    ctx.moveTo(x, k-20);
                    ctx.lineTo(x+w, k-20);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                    ctx.lineWidth = 2;
                    ctx.moveTo(x, k+21.5);
                    ctx.lineTo(x+w, k+21.5);
                    ctx.stroke();
                }

                for(m = x; m<(x+w); m+=w/2-30){
                    ctx.beginPath();
                    ctx.shadowColor = 'transparent';
                    ctx.strokeStyle = base_color;
                    ctx.lineWidth = 5;
                    ctx.lineCap = 'round';
                    ctx.moveTo(m+40, y-12);
                    ctx.lineTo(m+40, y+h-10);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                    ctx.lineWidth = 2;
                    ctx.moveTo(m+42, y+3);
                    ctx.lineTo(m+42, y+h-10);
                    ctx.stroke();
                }
            }
        }
    }

    // -----------------------------------Short Panel Dark Tint ----------------------------

    function sp_darkTint(frame_x, margin_y, window_w, window_h, sp_count){
        windows_SPDrktnt(sp_count);

        function windows_SPDrktnt(count){
            // var frame_x = (margin_x+(count*window_w)+(count*margin_x));
            if(count>=0 && count<=3){
                window_frame_SPDrktnt(frame_x);
                inner_frame_SPDrktnt(frame_x+13, margin_y+13, window_w-27, window_h-27);

                if(count==0 || count==1){                    
                    glass_frame_SPDrktnt(frame_x+18, margin_y+window_h-20, frame_x+window_w-21, margin_y+20, count);
                    
                }
                else if(count==2 || count==3){
                    glass_frame_SPDrktnt(frame_x+18, margin_y+window_h-20, frame_x+window_w-21, margin_y+20, count);
                    
                }
            }

            function glass_frame_SPDrktnt(frame_x, frame_y, end_x, end_y, count){
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'transparent';
                ctx.moveTo(frame_x, frame_y);
                ctx.lineTo(frame_x, end_y);
                ctx.lineTo(end_x, end_y);
                ctx.lineTo(end_x, frame_y);
                ctx.lineTo(frame_x, frame_y);
                ctx.stroke();

                ctx.save();
                ctx.clip();


                if(count == 0 || count== 1){
                    ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                }
                else if(count==3 || count ==2){
                    ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                }

                                    
                    ctx.fillRect(frame_x, end_y, window_w, window_h);
                    ctx.fill();

                ctx.restore();
            }

            function inner_frame_SPDrktnt(inner_x, inner_y, frame_width, frame_height){
                // outer layer for clipping
                ctx.lineWidth = 1;
                ctx.strokeStyle = base_color;
                ctx.rect(inner_x, inner_y, frame_width, frame_height);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                // section under clipping
                ctx.lineWidth = 8;
                ctx.strokeStyle = '#9e9383';
                // ctx.strokeStyle = 'white';
                ctx.strokeRect(inner_x, inner_y, frame_width, frame_height);

                //left shadow_light
                dark_shadow_SPDrktnt(inner_x, inner_y, inner_y+frame_height, 2, '#b0a89b', 'ls');
                dark_shadow_SPDrktnt(inner_x+2, inner_y+2, inner_y+frame_height-2,2, '#a59b8d', 'ls');
                //left shadow_dark
                dark_shadow_SPDrktnt(inner_x+3, inner_y+3, inner_y+frame_height-3, 1, '#8f8270', 'ls');
                dark_shadow_SPDrktnt(inner_x+5, inner_y+5, inner_y+frame_height-5,1, '#817565', 'ls');

                //right shadow_light
                dark_shadow_SPDrktnt(inner_x+frame_width-5, inner_y+5, inner_y+frame_height-5, 2, '#a59b8d', 'ls');
                dark_shadow_SPDrktnt(inner_x+frame_width-4, inner_y-3, inner_y+frame_height-3,1, '#a59b8d', 'ls');
                //right shadow_dark
                dark_shadow_SPDrktnt(inner_x+frame_width-2, inner_y+2, inner_y+frame_height-2, 2, '#968978', 'ls');
                dark_shadow_SPDrktnt(inner_x+frame_width, inner_y, inner_y+frame_height,2, '#8f8270', 'ls');

                // top_shadow_dark
                dark_shadow_SPDrktnt(inner_x, inner_y, inner_x+frame_width, 2, '#a59b8d', 'ts');
                dark_shadow_SPDrktnt(inner_x+2, inner_y+2, inner_x+frame_width-2, 1, '#a59b8d', 'ts');
                // top_shadow_light
                dark_shadow_SPDrktnt(inner_x+5, inner_y+5, inner_x+frame_width-5, 1, '#8f8270', 'ts');
                dark_shadow_SPDrktnt(inner_x+3, inner_y+4, inner_x+frame_width-4, 2, '#968978', 'ts');

                // bottom_shadow_light
                dark_shadow_SPDrktnt(inner_x+5, inner_y+frame_height-5, inner_x+frame_width-5, 2, '#a59b8d', 'ts');
                dark_shadow_SPDrktnt(inner_x+3, inner_y+frame_height-3, inner_x+frame_width-3, 1, '#a59b8d', 'ts');
                // bottom_shadow_dark
                dark_shadow_SPDrktnt(inner_x+2, inner_y+frame_height-3, inner_x+frame_width-2, 2, '#968978', 'ts');
                dark_shadow_SPDrktnt(inner_x, inner_y+frame_height-1, inner_x+frame_width, 1, '#8f8270', 'ts');
                

                ctx.restore();
            }

            function window_frame_SPDrktnt(x){
                // base rectangle
                ctx.fillStyle = '#9a8f7e';
                ctx.fillRect(x, margin_y, window_w, window_h);

                // outer layer for clipping
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'transparent';
                ctx.rect(x, margin_y, window_w, window_h);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                // section under clipping
                ctx.lineWidth = 16;
                ctx.strokeStyle = '#9e9383';
                // ctx.strokeStyle = 'white';
                ctx.strokeRect(x, margin_y, window_w, window_h);

                //left shadow_dark
                dark_shadow_SPDrktnt(x+8, margin_y+8, margin_y+window_h-8, 2, '#817565', 'ls');
                dark_shadow_SPDrktnt(x+6, margin_y+6, margin_y+window_h-6,2, '#8f8270', 'ls');
                // left shadow_light
                dark_shadow_SPDrktnt(x, margin_y, margin_y+window_h, 2, '#b0a89b', 'ls');
                dark_shadow_SPDrktnt(x+2, margin_y+2, margin_y+window_h-2, 1, '#b0a89b', 'ls');

                //right shadow_light
                dark_shadow_SPDrktnt(x+window_w-8, margin_y+8, margin_y+window_h-7, 2, '#b0a89b', 'ls');
                dark_shadow_SPDrktnt(x+window_w-6, margin_y+6, margin_y+window_h-5,1, '#b0a89b', 'ls');
                //right shadow_dark
                dark_shadow_SPDrktnt(x+window_w-2, margin_y+2, margin_y+window_h-2, 2, '#968978', 'ls');
                dark_shadow_SPDrktnt(x+window_w, margin_y, margin_y+window_h,2, '#8f8270', 'ls');

                // top_shadow_dark
                dark_shadow_SPDrktnt(x+6, margin_y+6, x+window_w-6, 2, '#968978', 'ts');
                dark_shadow_SPDrktnt(x+8, margin_y+8, x+window_w-8, 2, '#8f8270', 'ts');
                // top_shadow_light
                dark_shadow_SPDrktnt(x+2, margin_y+2, x+window_w-2, 2, '#a59b8d', 'ts');
                dark_shadow_SPDrktnt(x, margin_y, x+window_w, 2, '#a59b8d', 'ts');

                // bottom shadow_dark
                dark_shadow_SPDrktnt(x+2, margin_y+window_h-4, x+window_w-2, 2, '#968978', 'ts');
                dark_shadow_SPDrktnt(x, margin_y+window_h-2, x+window_w, 2, '#8f8270', 'ts');
                // bottom shadow_light
                dark_shadow_SPDrktnt(x+8, margin_y+window_h-8, x+window_w-8, 2, '#a59b8d', 'ts');
                dark_shadow_SPDrktnt(x+6, margin_y+window_h-6, x+window_w-6, 1, '#a59b8d', 'ts');

                ctx.restore();
            }
            function dark_shadow_SPDrktnt(x, y, l_xy, lw, shadow, shadow_orientation){
                ctx.beginPath();
                ctx.lineWidth = lw;
                ctx.strokeStyle = shadow;
                ctx.moveTo(x, y);
                if(shadow_orientation == 'ls'){                    
                    ctx.lineTo(x, l_xy);
                }
                else if(shadow_orientation == 'ts'){                    
                    ctx.lineTo(l_xy, y);
                }
                ctx.stroke();
            }
        }
    }

    




    // ==========================================================================Stamp section=============


    // ================================= Traditional Recessed Panel-----------------------------------------

    function Recessed_panel(x, y, w, h){
        ctx.lineWidth = 1;
        ctx.strokeStyle = darker1;
        // ctx.strokeStyle = 'red';
        ctx.strokeRect(x, y, w, h);
        // ctx.stroke();

        // stamps(i, y, stamp_w/2-11.5, stamp_area_h/2+15);

        for(s=0; s<4; s++){
            ctx.strokeStyle = 'transparent';
            ctx.strokeRect(x+2, y+2, (w/4)-(margin-8), h-4);
            // ctx.stroke();

            stamp_outline(x+2, y+2, (w/4)-(margin-8), h-4);
    
            stamp_shadow(x+3, y+3, (w/4)-(margin-8), h-5);
            
            x=x+(w/4)+6;
        }

        function stamp_outline(x, y, w, h){
            ctx.strokeStyle = 'transparent';
            ctx.strokeRect(x, y, w, h);
            // ctx.stroke();
    
            ctx.strokeStyle = 'transparent';
            ctx.strokeRect(x+0.5, y+0.5, w, h);
            // ctx.stroke();
        }

        function stamp_shadow(stamp_x, stamp_y, stamp_w, stamp_h){
            left_shadow(stamp_x+0.5, stamp_y+0.2, stamp_y+stamp_h, darker2);
            top_shadow(stamp_x+0.5, stamp_y, stamp_w, darker2);
            right_shadow(stamp_x+stamp_w, stamp_y, stamp_h, lighter2);
            bottom_shadow(stamp_x, stamp_y,stamp_w, stamp_h, lighter1);
            
        }
        
        function top_shadow(x, y, w, top_shadow){
            ctx.beginPath();
            ctx.fillStyle = top_shadow;
            ctx.strokeStyle = 'transparent';
            ctx.moveTo(x, y);
            ctx.lineTo(x+w, y);
            ctx.lineTo(x+w-3, y+5);
            ctx.lineTo(x+3, y+6);
            ctx.closePath();
            ctx.fill();
            // ctx.stroke();
        }

        function left_shadow(x, y, ly, l_shadow){
            ctx.beginPath();
            ctx.fillStyle = l_shadow;
            ctx.strokeStyle = 'transparent';
            ctx.moveTo(x, y);
            ctx.lineTo(x+4, y+4);
            ctx.lineTo(x+4, ly-2);
            ctx.lineTo(x, ly);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.fill();
            // ctx.stroke();
            
        }        

        function right_shadow(x, y, h, right_shadow){                
            ctx.beginPath();
            ctx.fillStyle = right_shadow;
            ctx.moveTo(x, y);
            ctx.lineTo(x, y+h);
            ctx.lineTo(x-5, y+h-4);
            ctx.lineTo(x-5, y+4);
            ctx.closePath();
            ctx.fill();
        }

        function bottom_shadow(x, y, w, h, b_shadow){
            ctx.beginPath();
            ctx.strokeStyle = 'transparent';
            ctx.fillStyle = b_shadow;
            ctx.moveTo(x+4,y+h-5);
            ctx.lineTo(x+w-5, y+h-5);
            ctx.lineTo(x+w, y+h);
            ctx.lineTo(x, y+h);
            ctx.closePath();                
            ctx.fill();
            ctx.stroke();
        }
    }


    // ================================= Traditional Raised Panel-----------------------------------------

    function Raised_panel(x, y, w, h){
        ctx.lineWidth = 1;
        ctx.strokeStyle = darker1;
        // ctx.strokeStyle = 'red';
        ctx.strokeRect(x, y, w, h);
        ctx.stroke();

        // stamps(i, y, stamp_w/2-11.5, stamp_area_h/2+15);

        for(s=0; s<4; s++){
            ctx.strokeStyle = 'transparent';
            ctx.strokeRect(x+2, y+2, (w/4)-(margin-8), h-4);
            ctx.stroke();

            stamp_outline(x+2, y+2, (w/4)-(margin-8), h-4);
    
            stamp_shadow(x+3, y+3, (w/4)-(margin-8), h-5);

            stamp_inner_shadow(x+4, y+4, (w/4)-(margin-10), h-5);
            
            x=x+(w/4)+6;
        }

        function stamp_outline(x, y, w, h){
            ctx.strokeStyle = 'transparent';
            ctx.strokeRect(x, y, w, h);
            ctx.stroke();
    
            ctx.strokeStyle = 'transparent';
            ctx.strokeRect(x+0.5, y+0.5, w, h);
            ctx.stroke();
        }

        function stamp_shadow(stamp_x, stamp_y, stamp_w, stamp_h){
            left_shadow(stamp_x+0.5, stamp_y+0.2, stamp_y+stamp_h, darker2);
            top_shadow(stamp_x+0.5, stamp_y, stamp_w, divider_clr1);
            right_shadow(stamp_x+stamp_w, stamp_y, stamp_h, lighter2);
            bottom_shadow(stamp_x, stamp_y,stamp_w, stamp_h, lighter1);
            
        }

        function stamp_inner_shadow(stamp_x, stamp_y, stamp_w, stamp_h){
            left_inner_shadow(stamp_x+3, stamp_y+3, stamp_y+stamp_h-4, lighter2);
            top_inner_shadow(stamp_x+3, stamp_y+1, stamp_w, lighter1);
            right_inner_shadow(stamp_x+stamp_w+1, stamp_y+1, stamp_h-4, darker2);
            bottom_inner_shadow(stamp_x+2, stamp_y+4,stamp_w-2, stamp_h-8, darker1);
            
        }
        
        function top_shadow(x, y, w, top_shadow){
            ctx.beginPath();
            ctx.fillStyle = top_shadow;
            ctx.strokeStyle = top_shadow;
            ctx.moveTo(x, y);
            ctx.lineTo(x+w, y);
            ctx.lineTo(x+w-3, y+3);
            ctx.lineTo(x+3, y+3);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        function left_shadow(x, y, ly, l_shadow){
            ctx.beginPath();
            ctx.fillStyle = l_shadow;
            ctx.strokeStyle = l_shadow;
            ctx.moveTo(x, y);
            ctx.lineTo(x+2, y+4);
            ctx.lineTo(x+2, ly-2);
            ctx.lineTo(x, ly);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();            
        }       
        

        function right_shadow(x, y, h, right_shadow){                
            ctx.beginPath();
            ctx.fillStyle = right_shadow;
            ctx.moveTo(x, y);
            ctx.lineTo(x, y+h);
            ctx.lineTo(x-5, y+h-4);
            ctx.lineTo(x-5, y+4);
            ctx.closePath();
            ctx.fill();
        }

        function bottom_shadow(x, y, w, h, b_shadow){
            ctx.beginPath();
            ctx.fillStyle = b_shadow;
            ctx.moveTo(x+4,y+h-5);
            ctx.lineTo(x+w-5, y+h-5);
            ctx.lineTo(x+w, y+h);
            ctx.lineTo(x, y+h);
            ctx.closePath();                
            ctx.fill();
        }

        
        function left_inner_shadow(x, y, ly, l_shadow){
            ctx.beginPath();
            ctx.fillStyle = l_shadow;
            ctx.strokeStyle = l_shadow;
            ctx.moveTo(x, y);
            ctx.lineTo(x+1, ly);
            ctx.lineTo(x+8, ly-7);
            ctx.lineTo(x+8, y+7);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
        }

        function top_inner_shadow(x, y, w, top_shadow){
            ctx.beginPath();
            ctx.fillStyle = top_shadow;
            ctx.strokeStyle = 'transparent';
            ctx.moveTo(x, y+1);
            ctx.lineTo(x+w-7, y+1);
            ctx.lineTo(x+w-14, y+10);
            ctx.lineTo(x+8, y+10);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        function right_inner_shadow(x, y, h, right_shadow){                
            ctx.beginPath();
            ctx.fillStyle = right_shadow;
            ctx.strokeStyle = 'transparent';
            ctx.moveTo(x-7, y+1);
            ctx.lineTo(x-7, y+h);
            ctx.lineTo(x-14, y+h-8);
            ctx.lineTo(x-14, y+10);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            //bottom_line
            ctx.beginPath();
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = darker2;
            ctx.moveTo(x-14, y+10);
            ctx.lineTo(x-14, y+h-8);
            ctx.stroke();
        }

        function bottom_inner_shadow(x, y, w, h, b_shadow){
            ctx.beginPath();
            ctx.fillStyle = b_shadow;
            ctx.strokeStyle = 'transparent';
            ctx.moveTo(x+9,y+h-7);
            ctx.lineTo(x+w-14, y+h-7);
            ctx.lineTo(x+w-8, y+h);
            ctx.lineTo(x+2, y+h);
            ctx.closePath();                
            ctx.fill();
            ctx.stroke();

            //bottom_line
            ctx.beginPath();
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = darker1;
            ctx.moveTo(x+9,y+h-7);
            ctx.lineTo(x+w-14, y+h-7);
            ctx.stroke();

        }
        
    }


    // ================================= Traditional Short Panel-----------------------------------------

    function short_panel(x, y, w, h){
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgb(207, 209, 199)';
        ctx.strokeStyle = 'transparent';
        ctx.strokeRect(x, y, w, h);
        ctx.stroke();

        // stamps(i, y, stamp_w/2-11.5, stamp_area_h/2+15);
        if(selectedPanel == 'Short'){
            p = 2;
        }
        else if(selectedPanel == 'Long'){
            p = 1;
        }

        for(s=0; s<p; s++){
            ctx.strokeStyle = 'transparent';
            ctx.strokeRect(x+2, y+2, (w/p)-(margin/2), h-4);
            ctx.stroke();

            stamp_outline(x+2, y+2, (w/p)-(margin/2), h-4);
    
            stamp_shadow(x+3, y+3, (w/p)-(margin/2-2), h-6);

            stamp_inner_shadow(x+7, y+8, (w/p)-(margin), h-10);

            
            x=x+(w/2)+12;
        }

        function stamp_outline(x, y, w, h){
            ctx.strokeStyle = divider_clr1;
            // ctx.strokeStyle = 'green';
            ctx.strokeRect(x, y, w, h);
            ctx.stroke();
    
            ctx.strokeStyle = divider_clr2;
            // ctx.strokeStyle = 'blue';
            ctx.strokeRect(x+1, y+1, w, h-2);
            ctx.stroke();
        }

        function stamp_shadow(stamp_x, stamp_y, stamp_w, stamp_h){
            left_shadow(stamp_x+0.5, stamp_y, stamp_y+stamp_h, darker2);
            top_shadow(stamp_x+0.5, stamp_y, stamp_w, darker1);
            right_shadow(stamp_x+stamp_w, stamp_y, stamp_h, lighter2);
            bottom_shadow(stamp_x, stamp_y,stamp_w, stamp_h, lighter1);
        }

        function stamp_inner_shadow(stamp_x, stamp_y, stamp_w, stamp_h){
            left_inner_shadow(stamp_x+0.5, stamp_y+0.2, stamp_y+stamp_h-8, lighter2);
            top_inner_shadow(stamp_x+0.5, stamp_y, stamp_w+13, lighter1);
            right_inner_shadow(stamp_x+stamp_w+14, stamp_y, stamp_h-8, darker2);
            bottom_inner_shadow(stamp_x-1, stamp_y,stamp_w+16, stamp_h-8, darker2);            
        }
        
        
        function top_shadow(x, y, w, top_shadow){
            ctx.beginPath();
            ctx.fillStyle = top_shadow;
            ctx.strokeStyle = top_shadow;
            ctx.moveTo(x, y+1);
            ctx.lineTo(x+w-3, y+1);
            ctx.lineTo(x+w-11, y+11);
            ctx.lineTo(x+8, y+11);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        function left_shadow(x, y, ly, l_shadow){
            ctx.beginPath();
            ctx.fillStyle = l_shadow;
            ctx.strokeStyle = l_shadow;
            ctx.moveTo(x, y);
            ctx.lineTo(x+8, y+7);
            ctx.lineTo(x+8, ly-4);
            ctx.lineTo(x, ly);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();            
        }
        

        function right_shadow(x, y, h, right_shadow){                
            ctx.beginPath();
            ctx.fillStyle = right_shadow;
            ctx.strokeStyle = right_shadow;
            ctx.moveTo(x-2, y);
            ctx.lineTo(x-2, y+h);
            ctx.lineTo(x-11, y+h-9);
            ctx.lineTo(x-11, y+11);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        function bottom_shadow(x, y, w, h, b_shadow){
            ctx.beginPath();
            ctx.fillStyle = b_shadow;
            ctx.moveTo(x+8,y+h-8);
            ctx.lineTo(x+w-10, y+h-8);
            ctx.lineTo(x+w-2, y+h);
            ctx.lineTo(x, y+h);
            ctx.closePath();                
            ctx.fill();
        }

        function left_inner_shadow(x, y, ly, l_r_inner_shadow){
            ctx.beginPath();
            ctx.fillStyle = l_r_inner_shadow;
            ctx.strokeStyle = l_r_inner_shadow;
            ctx.moveTo(x+6, y+8);
            ctx.lineTo(x+7, ly-3);
            ctx.lineTo(x+19, ly-12);
            ctx.lineTo(x+19, y+20);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
        }

        function top_inner_shadow(x, y, w, l_r_inner_shadow){
            ctx.beginPath();
            ctx.fillStyle = l_r_inner_shadow;
            ctx.strokeStyle = 'transparent';
            ctx.moveTo(x+6, y+8);
            ctx.lineTo(x+w-14, y+8);
            ctx.lineTo(x+w-25, y+23);
            ctx.lineTo(x+19, y+23);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        function right_inner_shadow(x, y, h, b_r_inner_shadow){                
            ctx.beginPath();
            ctx.fillStyle = b_r_inner_shadow;
            ctx.strokeStyle = 'transparent';
            ctx.moveTo(x-14, y+8);
            ctx.lineTo(x-14, y+h-2);
            ctx.lineTo(x-27, y+h-14);
            ctx.lineTo(x-27, y+23);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();


           //bottom_line
            ctx.beginPath();
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = '#1f1913';
            //ctx.strokeStyle = 'red';
            ctx.moveTo(x-28, y+23);
            ctx.lineTo(x-28, y+h-9);
            ctx.stroke();
        }

        function bottom_inner_shadow(x, y, w, h, b_shadow){
            ctx.beginPath();
            ctx.fillStyle = b_shadow;
            ctx.strokeStyle = 'transparent';
            ctx.moveTo(x+22,y+h-15);
            ctx.lineTo(x+w-29, y+h-15);
            ctx.lineTo(x+w-15, y+h-3);
            ctx.lineTo(x+7, y+h-3);
            ctx.closePath();                
            ctx.fill();
            ctx.stroke();

            //bottom_line
            ctx.beginPath();
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = '#1f1913';
            // ctx.strokeStyle = 'red';
            ctx.moveTo(x+22,y+h-15);
            ctx.lineTo(x+w-29, y+h-15);
            ctx.stroke();

        }

        
    }


    // ================================ Beadboard =================================


    function beadboards(stamp_x, stamp_y, stamp_w, stamp_h){
        
        if(selectedPanel == 'beadboard'){
            p=2;
        }
        else if(selectedPanel =='l_beadboard'){
            p=1;
        }
        for(var t = 0; t<p; t++){
            stamp_outline(stamp_x, stamp_y, stamp_w/p-15, stamp_h);
            stamp_shadow(stamp_x, stamp_y, stamp_w/p-15, stamp_h);

            stamp_x = stamp_x+(stamp_w/p)+15;
        }
    }
    function stamp_outline(x, y, w, h){
        ctx.strokeStyle = divider_clr1;
        ctx.strokeRect(x, y, w, h);
        ctx.stroke();

        ctx.strokeStyle = divider_clr2;
        ctx.strokeRect(x+0.5, y+0.5, w, h);
        ctx.stroke();
    }

    function stamp_shadow(stamp_x, stamp_y, stamp_w, stamp_h){
        left_shadow(stamp_x+0.5, stamp_y, stamp_y+stamp_h, darker2);
        top_shadow(stamp_x+0.5, stamp_y, stamp_w, darker1);
        right_shadow(stamp_x+stamp_w, stamp_y, stamp_h, lighter2);
        bottom_shadow(stamp_x, stamp_y,stamp_w, stamp_h, lighter1);

        beadboard_base(stamp_x+5, stamp_y+5,stamp_w-10, stamp_h-10);
        
    }

    function beadboard_base(stamp_x, stamp_y,stamp_w, stamp_h){
        left_shadow(stamp_x+0.5, stamp_y, stamp_y+stamp_h, lighter2);
        top_shadow(stamp_x+0.5, stamp_y, stamp_w, lighter1);
        right_shadow(stamp_x+stamp_w, stamp_y, stamp_h, darker2);
        bottom_shadow(stamp_x, stamp_y,stamp_w, stamp_h, darker1);

        beadboard_area(stamp_x+4, stamp_y+4, stamp_w-9, stamp_h-9);

        
    }

    
    
    function top_shadow(x, y, w, top_shadow){
        ctx.beginPath();
        ctx.fillStyle = top_shadow;
        ctx.strokeStyle = 'transparent';
        ctx.moveTo(x, y);
        ctx.lineTo(x+w, y);
        ctx.lineTo(x+w-4, y+4);
        ctx.lineTo(x+4, y+4);
        ctx.closePath();
        ctx.fill();
        //ctx.stroke();
    }

    function left_shadow(x, y, ly, l_shadow){
        ctx.beginPath();
        ctx.fillStyle = l_shadow;
        ctx.strokeStyle = 'transparent';
        ctx.moveTo(x, y);
        ctx.lineTo(x+4, y+4);
        ctx.lineTo(x+4, ly-4);
        ctx.lineTo(x, ly);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.fill();
       //ctx.stroke();
        
    }

    

    function right_shadow(x, y, h, right_shadow){                
        ctx.beginPath();
        ctx.fillStyle = right_shadow;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y+h);
        ctx.lineTo(x-5, y+h-4);
        ctx.lineTo(x-5, y+4);
        ctx.closePath();
        ctx.fill();
    }

    function bottom_shadow(x, y, w, h, b_shadow){
        ctx.beginPath();
        ctx.fillStyle = b_shadow;
        ctx.moveTo(x+4,y+h-5);
        ctx.lineTo(x+w-5, y+h-5);
        ctx.lineTo(x+w, y+h);
        ctx.lineTo(x, y+h);
        ctx.closePath();                
        ctx.fill();
    }

    function beadboard_area(x, y, w, h){
        ctx.fillStyle = 'transparent';
        ctx.fillRect(x, y, w, h);
        //ctx.fill();

        bb_count = 0;

        if(selectedPanel == 'beadboard'){
            bb = 5;
        }
        else if(selectedPanel =='l_beadboard'){
            bb = 8;
        }

        for(q=x+(w/bb)-2; q<=x+w; q=q+(w/bb)+1){

            divider_left(q, y, w, h, bb_count);
            divider_right(q, y, w, h, bb_count);

            bb_count++;
        }       
        
    }

    //beadboards
    function divider_left(i, y, w, h){
        ctx.beginPath();
        ctx.fillStyle = darker2;
        ctx.moveTo(i, y);
        ctx.lineTo(i, y+h);
        ctx.lineTo(i+2, y+h+3);
        ctx.lineTo(i+2, y-3);
        ctx.fill();
    }
    function divider_right(i, y, w, h){
        ctx.beginPath();
        ctx.fillStyle = lighter2;
        ctx.moveTo(i+2, y-3);
        ctx.lineTo(i+2, y+h+3);
        ctx.lineTo(i+4, y+h);
        ctx.lineTo(i+4, y);
        ctx.fill();
    }




    //--------------------------------------------------------------------------Hardware Integration
    
    function d_hardware_Handles(hw, d_xl, d_yl, d_xr, d_yr){
        pic1 = "images/"+hw+"/"+hw+"_Left.png";
        pic2 = "images/"+hw+"/"+hw+"_Right.png";
        
        door_hardware(pic1, pic2, d_xl+3, d_yl, d_xr, d_yr);
    }
    
    function d_hardware_strap(hw, d_xl, d_yl, d_xr, d_yr){
        pic1 = "images/"+hw+"/"+hw+"_Left.png";
        pic2 = "images/"+hw+"/"+hw+"_Right.png";      
        

        strap1 = "images/"+hw+"/"+hw+"_Strap_Left.png";
        strap2 = "images/"+hw+"/"+hw+"_Strap_Right.png";

        if(hw == 'Versailles_L'){
            strap1 = "images/"+hw+"/"+hw+"_Strap_Top_Left.png";
            strap2 = "images/"+hw+"/"+hw+"_Strap_Top_Right.png"; 
            strap3 = "images/"+hw+"/"+hw+"_Strap_Bottom_Right.png";
            strap4 = "images/"+hw+"/"+hw+"_Strap_Bottom_Left.png";   
        }
        else{
            strap1 = "images/"+hw+"/"+hw+"_Strap_Left.png";
            strap2 = "images/"+hw+"/"+hw+"_Strap_Right.png";
        }
        
        door_hardware(pic1, pic2, d_xl+3, d_yl, d_xr, d_yr);
        if(hw == 'Versailles_L'){
            door_hardware_Lstrap(strap1, strap2,strap3, strap4, d_xl, d_yl+2, d_xr, d_yr);    
        }
        else if(hw== 'Versailles'){
            door_hardware_strap(strap1, strap2, d_xl, d_yl, d_xr+10, d_yr);
        }
        else if(hw== 'Versailles' || hw=='Castlerock'){
            door_hardware_strap(strap1, strap2, d_xl, d_yl, d_xr+10, d_yr);
        }
        else if(hw== 'Maple_Creek'){
            door_hardware_strap(strap1, strap2, d_xl, d_yl, d_xr-8, d_yr);
        }
        else if(hw== 'Nottingham_Ring_B' || hw == 'Nottingham_Ring'){
            door_hardware_strap(strap1, strap2, d_xl, d_yl, d_xr+9, d_yr);
        }
        else{
            door_hardware_strap(strap1, strap2, d_xl, d_yl, d_xr, d_yr);
        }
        
    }

    function door_hardware(pic1, pic2, d_xl, d_yl, d_xr, d_yr){
        lock_img1 = new Image();
        lock_img1.src = pic1;
        lock_img1.onload = function(){
            ctx.drawImage(lock_img1, d_xl, d_yl);
        }

        lock_img2 = new Image();
        lock_img2.src = pic2;
        lock_img2.onload = function(){
            ctx.drawImage(lock_img2, d_xr, d_yr);
        }
    }

    function door_hardware_strap(strap1,strap2, d_xl, d_yl, d_xr, d_yr){
        strap_img1 = new Image();
        strap_img1.src = strap1;
        strap_img1.onload = function(){
            
            ctx.drawImage(strap_img1, d_xr+298, d_yr-190);
            ctx.drawImage(strap_img1, d_xr+298, d_yr+305);
        }

        strap_img2 = new Image();
        strap_img2.src = strap2;
        strap_img2.onload = function(){
            ctx.drawImage(strap_img2, d_xl-362, d_yl-190);
            ctx.drawImage(strap_img2, d_xl-362, d_yl+305);
        }
    }

    function door_hardware_Lstrap(strap1, strap2,strap3,strap4, d_xl, d_yl, d_xr, d_yr){
        strap_imgL1 = new Image();
        strap_imgL1.src = strap1;
        strap_imgL1.onload = function(){
            ctx.drawImage(strap_imgL1, d_xr+305, d_yr-194);
        }

        strap_imgL2 = new Image();
        strap_imgL2.src = strap2;
        strap_imgL2.onload = function(){
            ctx.drawImage(strap_imgL2, d_xl-355, d_yl-194);
        }

        strap_imgL3 = new Image();
        strap_imgL3.src = strap3;
        strap_imgL3.onload = function(){
            ctx.drawImage(strap_imgL3, d_xl-355, d_yl+235);
        }

        strap_imgL4 = new Image();
        strap_imgL4.src = strap4;
        strap_imgL4.onload = function(){
            ctx.drawImage(strap_imgL4, d_xr+305, d_yr+235);
        }
    }

   // end //
}
