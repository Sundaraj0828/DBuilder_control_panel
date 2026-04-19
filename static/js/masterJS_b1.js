function draw(){  
    console.time('draw');
    console.log('traditional');

    var starttime = performance.now();

    var canvas = document.getElementById("door");
    var ctx =canvas.getContext("2d");  

    var selectedPanel = ''
    var selectedColor = ''

    var w_ft = document.getElementById("door_w").value;  //----ft
    var h_ft = document.getElementById("door_h").value;  //----ft

    if(w_ft && h_ft){

        selectedPanel = document.getElementById('panels').value;

        selectedColor = document.getElementById('colors').value;

        selectedGlassType = document.getElementById('glassType').value;    
        
        selectedWindow = document.getElementById('window').value;

        windowRow = document.getElementById('win_row').value;

        console.log('panel -- ', selectedPanel);
    }
    else{
        alert('select width n height first');
    }

    var width_options = [800, 900, 1000]

    // ---------------------------section height & rail_height

    var section_heights = [18, 21, 24]  // ----inch
    var rail_heights = [2.250, 3.750, 3.875, 1.875]   //----inch


    // -----------------------------------panel width

    var panel_width = {
        short_panel_w: 21.000, // ----inch
        long_panel_w : 41.000   // ----inch
    }
    
    var p_w = 0.0

    // --------------------------------------panel count

    function get_panel_count(panel, door_w){
        var panel_c = 0
        if(panel == 'Short'){
            // var p_w = panel_w['short_panel_w']
    
            if(door_w % 2 == 0 && door_w == 14){
                panel_c = (door_w-2)/2        
            }
            else if(door_w % 2 == 0 && door_w == 18){
                panel_c = (door_w-2)/2        
            }
            else if(door_w % 2 == 0 && door_w != 14){
                panel_c = door_w/2    
            }
            else if(door_w % 2 != 0 && door_w == 15){
                panel_c = (door_w-3)/2        
            }
            else if(door_w % 2 !=0 && door_w !=15){
                panel_c = (door_w-1)/2
            }
        }
        else if(panel == 'Long' ){
            // var p_w = panel_w['long_panel_w']
    
            if(door_w < 12){
                panel_c = 2
            }
            else if(door_w == 12 || door_w == 14){
                panel_c = 3  
            }
            else if(door_w >= 15 && door_w <= 18){
                panel_c = 4
            }
            else if(door_w == 20){
                panel_c = 5
            }
        }
        return panel_c
    }

    
    
    var panel_height = 13.500 // ----inch
    var beveled_edge = 2.830 // -----inch

    

    // console.log('w---', w_ft, 'h--', h_ft)

    // ================================width in pxl======================
    function get_width_height_in_px(w_ft, h_ft, width_options){
        var door_size = []
        var door_width = 0
        var door_height = 0
        if(w_ft>=8 && w_ft<=9){    
            door_width = width_options[0]
            door_height = door_width*(h_ft/w_ft)+4
        }
        else if(w_ft>=10 && w_ft <= 16){   
            door_width = width_options[1]
            door_height = door_width*(h_ft/w_ft)+4
        }
        else if(w_ft>=17 && w_ft<=20){ 
            door_width = width_options[2]
            door_height = door_width*(h_ft/w_ft)+4
        }

        if(door_width && door_height){
            door_size = [door_width, door_height] 
        }
        
        return door_size
    }

    

    // ====================== Starting of Door Building =============================================================

    
   

    var base_color = selectedColor
    
    
    if(w_ft){
        var width_height_px = get_width_height_in_px(w_ft, h_ft, width_options);
        // console.log('width---', width_height_px[0], 'Height----', width_height_px[1])
    }
    if(width_height_px.length == 2){        
        canvas.width = width_height_px[0]
        canvas.height = width_height_px[1]
        
        door_area(canvas.width, canvas.height, base_color, selectedPanel);
    }



    function get_color(base_c){
        lighter1 = LightenDarkenColor(base_c,13);
        lighter2 = LightenDarkenColor(base_c,25);
        lighter3 = LightenDarkenColor(base_c,39);
        

        if(selectedColor == '#181818'){
            darker1 = LightenDarkenColor(base_c,-5);
            darker2 = LightenDarkenColor(base_c,-30);
            darker3 = LightenDarkenColor(base_c,-55);
        }
        else{
            darker1 = LightenDarkenColor(base_c,-11);
            darker2 = LightenDarkenColor(base_c,-24);
            darker3 = LightenDarkenColor(base_c,-37);
        }   

        divider_clr1 = darker3
        divider_clr2 = lighter3

        return [lighter1, lighter2, lighter3, darker1, darker2, darker3]

    }



    // ==================== color shade generator =====================
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

    

    end_stile_s_short = {
        es_short_8:2.684, es_short_9:5.404, es_short10:3.090, es_short_12:3.496, 
        es_short_14:8, es_short_15:9.438, es_short_16:4.308, es_short_17:6.311, 
        es_short_18:8.654, es_short_20:4.328
    }

    end_stile_s_long = {
        es_long_8: 4.766, es_long_9: 9.636, es_long_10: 14.636, 
        es_long_12: 6.716, es_long_14: 12.716, es_long_15: 4.366, 
        es_long_16: 7.366, es_long_17: 9.766, es_long_18: 12.166, 
        es_long_20: 7.800
    }

    end_stile_s_fullView = 3.375;

    c_spacing_short = [2.188, 4.375, 5.175, 7.000, 3.330, 2.364]

    c_pacing_long = [4.440, 6.660, 10.660, 3.75, 9.75, 2.400, 4.400, 6.800, 9.200, 4.833]

    c_spacing_fullView = 2.750

    
    
    // var panel_wdth = get_panel_width(selectedPanel)
    // var panel_hght = get_panel_size(w_ft, h_ft, panel_height)
    // var panel_cnt = get_panel_count(selectedPanel, w_ft) 

    // var panel_spacing = get_spacings(selectedPanel)


    

    function get_panel_row_count(d_height){
        // ----------------------------panel row count
        if(d_height == 6 || d_height == 6.3 || d_height == 6.6 || d_height == 6.9 || d_height == 7){
            panel_row_count = 4
        }
        else if(d_height == 7.6 || d_height == 7.9 || d_height == 8 || d_height == 8.3 || d_height == 8.6 || d_height == 8.9){
            panel_row_count = 5
        }
        else if(d_height == 9 || h_ft == 9.3 || d_height == 9.6 || d_height == 9.9 || d_height == 10 || d_height == 10.3 || d_height == 10.6){
            panel_row_count = 6
        }
        else if(d_height == 10.9 || d_height == 11 || d_height==11.3 || d_height == 11.6 || d_height == 11.9 || d_height == 12){
            panel_row_count = 7
        }
        else if(d_height == 14){
            panel_row_count = 8
        }
        return panel_row_count
    }

    // ---------------------------Panel sizes
    function convert_in_ft(size_item){
        var item_ft = (size_item/12)
        // console.log(item_ft)
        return item_ft
    }
    function get_panel_px(p_w_ft){        
        var p_px = canvas.width*(p_w_ft/w_ft);
        // console.log(p_px)
        return p_px
    }

    // --------------------------------------------- function for getting sizes
    function get_panel_size(w, h, item){
        var panel_w_ft = convert_in_ft(item)
        var panel_px = get_panel_px(panel_w_ft)
        
        return panel_px
    } 

    // function get_fullView_railThickness(d_height){

    // }

    function get_section_h_rail_h(d_height){
        height_components = {}
        // -------------------section Height and rail height
        if(d_height == 6 || d_height == 7.6 || d_height == 9){
            sec_ht = get_panel_size(w_ft, h_ft, section_heights[0])
            rail_ht = get_panel_size(w_ft, h_ft, rail_heights[0])
            height_components['section_height'] = [sec_ht]
            height_components['rail_height'] = [rail_ht]
        }
        else if(d_height == 7 || d_height == 10.6 || d_height == 8.9){
            sec_ht = get_panel_size(w_ft, h_ft, section_heights[1])
            rail_ht = get_panel_size(w_ft, h_ft, rail_heights[1])
            height_components['section_height'] = [sec_ht]
            height_components['rail_height'] = [rail_ht]
        }
        else if(d_height == 6.3 || d_height == 6.6 || d_height == 6.9 || d_height == 7.9 || d_height == 8 || d_height == 8.3 || d_height == 8.6 || d_height == 9.3 || d_height == 9.6 || d_height == 9.9 ||d_height == 10 || d_height == 10.3 || d_height ==10.9 || d_height == 11 || d_height==11.3 || d_height == 11.6 || d_height == 11.9 || d_height == 12){
            sec_ht_18 = get_panel_size(w_ft, h_ft, section_heights[0])
            sec_ht_21 = get_panel_size(w_ft, h_ft, section_heights[1])
            rail_ht_18 = get_panel_size(w_ft, h_ft, rail_heights[0])
            rail_ht_21 = get_panel_size(w_ft, h_ft, rail_heights[1])
            
            height_components['section_height'] = [sec_ht_18, sec_ht_21]
            height_components['rail_height'] = [rail_ht_18, rail_ht_21]
        }
        else if(d_height == 14){
            sec_ht = get_panel_size(w_ft, h_ft, section_heights[1])
            rail_ht = get_panel_size(w_ft, h_ft, rail_heights[1])

            height_components['section_height'] = [sec_ht]
            height_components['rail_height'] = [rail_ht]
        }
        return height_components
    }

    function configure_sections(door_h, sec_hght,rail_height, count, p_count){
        var s_hght = 0;
        var r_hght = 0;
        if(door_h == 6.3 || door_h == 7.9 || door_h == 9.3 || door_h == 10.9){
            if(count==(p_count-1)){
                s_hght = sec_hght[1];
                r_hght = rail_height[1];
            }
            else{
                s_hght = sec_hght[0]; 
                r_hght = rail_height[0];
            }
            return [s_hght, r_hght]
        }
        else if(door_h == 6.9 || door_h == 8.6 || door_h == 10.3 || door_h == 12){
            p = Math.round((+p_count)/2)
            if(count==p-1){
                s_hght = sec_hght[0];
                r_hght = rail_height[0];
            }
            else{
                s_hght = sec_hght[1]; 
                r_hght = rail_height[1]; 
            }
            return [s_hght, r_hght]
        }
        else if(door_h == 6.6 || door_h == 8 || door_h == 9.6 || door_h == 11){
            if(count==0 || count ==(p_count-1)){
                s_hght = sec_hght[1];
                r_hght = rail_height[1];
            }
            else{
                s_hght = sec_hght[0]; 
                r_hght = rail_height[0]; 
            }
            return [s_hght, r_hght]
        }
        else if(door_h == 8.3 || door_h == 9.9 || door_h == 11.3){
            if(count==0 || count == p_count-1 || count == (p_count-2)){
                s_hght = sec_hght[1];
                r_hght = rail_height[1];
            }
            else{
                s_hght = sec_hght[0]; 
                r_hght = rail_height[0];
            }
            return [s_hght, r_hght]
        }
        else if(door_h == 10 || door_h == 11.9){
            p=Math.round((+p_count)/2)
            if(count== p-1 || count== p){
                s_hght = sec_hght[0];
                r_hght = rail_height[0];
            }
            else{
                s_hght = sec_hght[1]; 
                r_hght = rail_height[1]; 
            }
            return [s_hght, r_hght]
        }
        else if(door_h == 11.6){
            p=Math.round((+p_count)/2)
            if(count>=p-2 && count<=p){
                s_hght = sec_hght[0];
                r_hght = rail_height[0];
            }
            else{
                s_hght = sec_hght[1]; 
                r_hght = rail_height[1]; 
            }
            return [s_hght, r_hght]
        }
        else if(door_h == 14){
            p=Math.round((+p_count)/2)
            // if(count>=p-2 && count<=p){
            //     s_hght = sec_hght[0];
            //     r_hght = rail_height[0];
            // }
            // else{
                s_hght = sec_hght[1]; 
                r_hght = rail_height[1]; 
            // }
            return [s_hght, r_hght]
        }
        
    }

    function hr_divider(mx, y, lx, clr){
        if(y<canvas.height-4){
            //console.log('sizes to build divider : ', mx, y, lx);
            ctx.beginPath();
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = clr;
            ctx.moveTo(mx, y);
            ctx.lineTo(lx, y);
            ctx.stroke();
        }
        
    }
    

    function draw_dividers(panel_row, p_r_count, s_height, base_clr){
        divider_clr = get_color(base_clr)
        if(panel_row < p_r_count-1){
            
            hr_divider(0, s_height, canvas.width, divider_clr[5]);
            hr_divider(0, s_height+1, canvas.width, divider_clr[2]);
        }
    }



    function get_panel_width(s_panel){
        if(s_panel== 'Short'){
            p_w = panel_width['short_panel_w']
        }
        else if(s_panel== 'Long'){
            p_w = panel_width['long_panel_w']
        }

        panel_w = get_panel_size(w_ft, h_ft, p_w);
        return panel_w
    }


    // =================================get spacings======================
function get_spacings(panel){
    
    if(w_ft == 8){
        if(panel == 'Short'){
            var e_s_spacing = end_stile_s_short['es_short_8']
            var c_spacing = c_spacing_short[0]
        }
        else if(panel == 'Long' ){
            var e_s_spacing = end_stile_s_long['es_long_8']
            var c_spacing = c_pacing_long[0]
        }
    }
    else if(w_ft == 9){
        if(panel == 'Short'){
            var e_s_spacing = end_stile_s_short['es_short_9']
            var c_spacing = c_spacing_short[1]
        }
        else if(panel == 'Long'){
            var e_s_spacing = end_stile_s_long['es_long_9']
            var c_spacing = c_pacing_long[1]
        }
    }
    else if(w_ft == 10){
        if(panel == 'Short'){
            var e_s_spacing = end_stile_s_short['es_short10']
            var c_spacing = c_spacing_short[0]
        }
        else if(panel == 'Long'){
            var e_s_spacing = end_stile_s_long['es_long_10']
            var c_spacing = c_pacing_long[2]
        }
    }
    else if(w_ft == 12){
        if(panel == 'Short'){
            var e_s_spacing = end_stile_s_short['es_short_12']
            var c_spacing = c_spacing_short[0]
        }
        else if(panel == 'Long'){
            var e_s_spacing = end_stile_s_long['es_long_12']
            var c_spacing = c_pacing_long[3]
        }
    }
    else if(w_ft == 14){
        if(panel == 'Short'){
            var e_s_spacing = end_stile_s_short['es_short_14']
            var c_spacing = c_spacing_short[2]
        }
        else if(panel == 'Long'){
            var e_s_spacing = end_stile_s_long['es_long_14']
            var c_spacing = c_pacing_long[4]
        }
    }
    else if(w_ft == 15){
        if(panel == 'Short'){
            var e_s_spacing = end_stile_s_short['es_short_15']
            var c_spacing = c_spacing_short[3]
        }
        else if(panel == 'Long'){
            var e_s_spacing = end_stile_s_long['es_long_15']
            var c_spacing = c_pacing_long[5]
        }
    }
    else if(w_ft == 16){
        if(panel == 'Short'){
            var e_s_spacing = end_stile_s_short['es_short_16']
            var c_spacing = c_spacing_short[0]
        }
        else if(panel == 'Long'){
            var e_s_spacing = end_stile_s_long['es_long_16']
            var c_spacing = c_pacing_long[6]
        }
    }
    else if(w_ft == 17){
        if(panel == 'Short'){
            var e_s_spacing = end_stile_s_short['es_short_17']
            var c_spacing = c_spacing_short[4]
        }
        else if(panel == 'Long'){
            var e_s_spacing = end_stile_s_long['es_long_17']
            var c_spacing = c_pacing_long[7]
        }
    }        
    else if(w_ft == 18){
        if(panel == 'Short'){
            var e_s_spacing = end_stile_s_short['es_short_18']
            var c_spacing = c_spacing_short[1]
        }
        else if(panel == 'Long'){
            var e_s_spacing = end_stile_s_long['es_long_18']
            var c_spacing = c_pacing_long[8]
        }
    }        
    else if(w_ft == 20){
        if(panel == 'Short'){
            var e_s_spacing = end_stile_s_short['es_short_20']
            var c_spacing = c_spacing_short[5]
        }
        else if(panel == 'Long'){
            var e_s_spacing = end_stile_s_long['es_long_20']
            var c_spacing = c_pacing_long[9]
        }
    }
    e_s_spacing = get_panel_size(w_ft, h_ft, e_s_spacing)
    c_spacing = get_panel_size(w_ft, h_ft, c_spacing)
    //console.log('spacing----------------------------', e_s_spacing, c_spacing)
    return [e_s_spacing, c_spacing]
}





    




    // door divider ------------------------------
    function door_divider(h_ft, panel_r_count, height_comp, base_clr, selectedPanel){
        var p_row = 0;
        var s_hght = 0
        var r_hght = 0
        var s_height = height_comp['section_height']
        var r_height = height_comp['rail_height']

        for(i=0; i<panel_r_count; i++){
            p_row = panel_r_count

            if(s_height.length == 1){
                s_hght = (+s_hght) + (+s_height[0]);
                r_hght = r_height[0]
            }
            else if(s_height.length == 2){
                sec_h = configure_sections(h_ft, s_height,r_height, i, panel_r_count);
                s_hght = (s_hght) + (sec_h[0]);
                r_hght = sec_h[1]
            }
            // set_h_comps(height_comp, i, p_row)
            draw_dividers(i, panel_r_count, s_hght, base_clr)
            
        }
    }









   


    // -------------------------------------------inner shadow

    function left_inner_shadow(stamp_x, stamp_y, beveled_edge, panel_height){
        divider_clr = get_color(base_color)
        ctx.beginPath();
        ctx.fillStyle = divider_clr[0];
        // ctx.strokeStyle = 'red';
        ctx.moveTo(stamp_x, stamp_y+(beveled_edge/2));
        ctx.lineTo(stamp_x+(beveled_edge/2), stamp_y+beveled_edge);
        ctx.lineTo(stamp_x+(beveled_edge/2), stamp_y+panel_height-(beveled_edge));
        ctx.lineTo(stamp_x, stamp_y+panel_height-(beveled_edge/2));
        ctx.fill();
    }

    function top_inner_shadow(stamp_x, stamp_y, beveled_edge, panel_width){
        divider_clr = get_color(base_color)
        ctx.beginPath();
        ctx.fillStyle = divider_clr[1];
        // ctx.strokeStyle = 'red';
        ctx.moveTo(stamp_x+(beveled_edge/2), stamp_y+(beveled_edge/2));
        ctx.lineTo(stamp_x+panel_width-(beveled_edge/2), stamp_y+(beveled_edge/2));
        ctx.lineTo(stamp_x+panel_width-(beveled_edge), stamp_y+(beveled_edge));
        ctx.lineTo(stamp_x+(beveled_edge), stamp_y+(beveled_edge));
        ctx.fill();
    }

    function bottom_inner_shadow(stamp_x, stamp_y, beveled_edge, panel_width, panel_height){
        divider_clr = get_color(base_color)
        ctx.beginPath();
        ctx.fillStyle = divider_clr[3];
        // ctx.strokeStyle = 'red';
        ctx.moveTo(stamp_x+(beveled_edge), stamp_y+panel_height-(beveled_edge));
        ctx.lineTo(stamp_x+panel_width-(beveled_edge), stamp_y+panel_height-(beveled_edge));
        ctx.lineTo(stamp_x+panel_width-(beveled_edge/2), stamp_y+panel_height-(beveled_edge/2));
        ctx.lineTo(stamp_x+(beveled_edge/2), stamp_y+panel_height-(beveled_edge/2));
        ctx.fill();
    }
     
    function right_inner_shadow(stamp_x, stamp_y, beveled_edge, panel_width, panel_height){
        divider_clr = get_color(base_color)
        ctx.beginPath();
        ctx.fillStyle = divider_clr[3];
        // ctx.strokeStyle = 'red';
        ctx.moveTo(stamp_x+panel_width-(beveled_edge/2), stamp_y+(beveled_edge/2));
        ctx.lineTo(stamp_x+panel_width-(beveled_edge/2), stamp_y+panel_height-beveled_edge/2);
        ctx.lineTo(stamp_x+panel_width-(beveled_edge), stamp_y+panel_height-(beveled_edge));
        ctx.lineTo(stamp_x+panel_width-(beveled_edge), stamp_y+(beveled_edge));
        ctx.fill();
    }

    

    // -----------------------------------------------outer shadow
    function left_outer_shadow(stamp_x, stamp_y, beveled_edge, panel_height, clr_shade){
        
        ctx.beginPath();
        ctx.fillStyle = clr_shade[3];
        ctx.moveTo(stamp_x, stamp_y);
        ctx.lineTo(stamp_x+(beveled_edge/2), stamp_y+(beveled_edge/2));
        ctx.lineTo(stamp_x+(beveled_edge/2), stamp_y+panel_height-(beveled_edge/2));
        ctx.lineTo(stamp_x, stamp_y+panel_height);
        ctx.fill();
    }
    function top_outer_shadow(stamp_x, stamp_y, beveled_edge, panel_width){
        divider_clr = get_color(base_color)
        ctx.beginPath();
        ctx.fillStyle = divider_clr[4];
        // ctx.fillStyle = 'red';
        ctx.moveTo(stamp_x, stamp_y);
        ctx.lineTo(stamp_x+panel_width, stamp_y);
        ctx.lineTo(stamp_x+panel_width-(beveled_edge/2), stamp_y+(beveled_edge/2));
        ctx.lineTo(stamp_x+(beveled_edge/2), stamp_y+(beveled_edge/2));
        ctx.fill();
    }
    function right_outer_shadow(stamp_x, stamp_y, beveled_edge, panel_height, panel_width){
        divider_clr = get_color(base_color)
        ctx.beginPath();
        ctx.fillStyle = divider_clr[1];
        ctx.moveTo(stamp_x+panel_width, stamp_y);
        ctx.lineTo(stamp_x+panel_width, stamp_y+panel_height);
        ctx.lineTo(stamp_x+panel_width-(beveled_edge/2), stamp_y+panel_height-(beveled_edge/2));
        ctx.lineTo(stamp_x+panel_width-(beveled_edge/2), stamp_y+(beveled_edge/2));
        ctx.fill();
    }
    
    function bottom_outer_shadow(stamp_x, stamp_y , beveled_edge, panel_width, panel_height){
        divider_clr = get_color(base_color)
        ctx.beginPath();
        ctx.fillStyle = divider_clr[0];
        ctx.moveTo(stamp_x, stamp_y+panel_height);
        ctx.lineTo(stamp_x+panel_width, stamp_y+panel_height);
        ctx.lineTo(stamp_x+panel_width-(beveled_edge/2), stamp_y+panel_height-(beveled_edge/2));
        ctx.lineTo(stamp_x+(beveled_edge/2), stamp_y+panel_height-(beveled_edge/2));
        ctx.fill();
    }

    // stamps_col(e_spacing, sc_height, p, r_hght, c_spacing, p_wdth, p_hght, b_edge);

    function stamps_col(x, y, p_count, r_height, c_stl_spacing, w, h, beveled_edge){
        ctx.fillStyle = base_color;
        ctx.fillRect(x, y, w, h);
        //ctx.fill();

        color_shades = get_color(base_color)

        left_outer_shadow(x, y, beveled_edge, h, color_shades);
        top_outer_shadow(x, y, beveled_edge, w);
        right_outer_shadow(x, y, beveled_edge, h, w);
        bottom_outer_shadow(x, y, beveled_edge, w, h);
        
        
        bottom_inner_shadow(x, y, beveled_edge, w, h);
        left_inner_shadow(x+(beveled_edge/2), y, beveled_edge, h);
        top_inner_shadow(x, y, beveled_edge, w);
        right_inner_shadow(x, y, beveled_edge, w, h);
    }
    


    function stamp_area(panel_r_count, p_count, p_wdth, p_hght, p_spacing, h_comp, w_row){
        var s_hght = 0
        var r_hght = 0
        var s_height = h_comp['section_height']
        var r_height = h_comp['rail_height']
        row_count = panel_r_count
        for(i=0; i<panel_r_count; i++){
            p_row = panel_r_count
            // console.log('panel row count-----', p_row);
            // console.log('panel spacing-----', p_spacing);

            if(s_height.length == 1){
                s_hght = (+s_hght) + (+s_height[0]);
                r_hght = r_height[0]
            }
            else if(s_height.length == 2){
                sec_h = configure_sections(h_ft, s_height,r_height, i, panel_r_count);
                s_hght = (s_hght) + (sec_h[0]);
                r_hght = sec_h[1]
            }
            

            sc_height = s_hght-(p_hght+r_hght);
            e_spacing = p_spacing[0]
            c_spacing = p_spacing[1]           

            b_edge = get_panel_size(w_ft, h_ft, beveled_edge)
            end_stile_spacing = e_spacing
            if(row_count != w_row){
                for(p = 0; p<p_count; p++){
                    panel_x = end_stile_spacing
                    
                    if(p!=0){
                        panel_x = end_stile_spacing+(p_wdth+c_spacing)*p
                    }
                    
                    //console.log('panel x----', panel_x)
                    
                    stamps_col(panel_x, sc_height, p, r_hght, c_spacing, p_wdth, p_hght, b_edge);
                }
            }
            row_count--
        }
    }

    
    
    
    
    // ============================ Door Area ============================
    function door_area(d_width, d_height, b_color, selectedPanel){
        ctx.fillStyle = b_color; 
        ctx.fillRect(0, 0, d_width, d_height-4);   
        ctx.fill(); 

        if(d_width && d_height){

            panel_r_count = get_panel_row_count(h_ft);
            h_comp = get_section_h_rail_h(h_ft);
            

            if(selectedPanel){
                // console.log(selectedPanel)
                if(selectedPanel=='Short' || selectedPanel== 'Long'){
                    var panel_count = get_panel_count(selectedPanel, w_ft) 
                    var panel_wdth = get_panel_width(selectedPanel)
                    var panel_hght = get_panel_size(w_ft, h_ft, panel_height)
                    var b_edge = get_panel_size(w_ft, h_ft, beveled_edge)
                    var panel_spacing = get_spacings(selectedPanel)
                    //console.log('panel _ spacing',panel_spacing)
                }
            }

            bottom_line();
            
            door_divider(h_ft, panel_r_count, h_comp, b_color, selectedPanel);

            if(selectedPanel ){
                if(selectedPanel == 'Long' || selectedPanel == 'Short'){
                    if(windowRow && selectedGlassType != 'closed'){
                        windows_row = windowRow
                    }
                    else{
                        windows_row = ''
                    }
                    stamp_area(panel_r_count, panel_count, panel_wdth, panel_hght, panel_spacing, h_comp, windows_row);
                    
                }
            }
            
            if(selectedGlassType != 'closed'){
                if(selectedPanel == 'Short'){
                    if(selectedWindow){
                        if(selectedWindow == 'sp_wagonWheel'){
                            if(w_ft == 10){
                                alert(selectedWindow + ' is not supported with ' + w_ft + 'ft wide door');
                                window_call(panel_r_count, panel_count, panel_wdth, panel_spacing, panel_hght, b_edge, 'sp_clear');                        
                            }
                            else{
                                window_call(panel_r_count, panel_count, panel_wdth, panel_spacing, panel_hght, b_edge, selectedWindow);                        
                            }
                            
                        }
                        else{
                            window_call(panel_r_count, panel_count, panel_wdth, panel_spacing, panel_hght, b_edge, selectedWindow);                        
                        }
                        
                    }   
                    else{
                        console.log('--select a window--')
                    }
                }
                else if(selectedPanel == 'Long'){
                    if(selectedWindow){
                        window_call(panel_r_count, panel_count, panel_wdth, panel_spacing, panel_hght, b_edge, selectedWindow);                        
                    }   
                    else{
                        console.log('--select a window--')
                    }
                }
            }  
        }  
        else{
            alert('select width and height first');
        }    
    }   



    function rad_grad(x, y, w, h, count){
        if(selectedPanel == 'Short' || selectedPanel == 'Long'){
            if(selectedGlassType == 'clear'){      
                win_grad = ctx.createRadialGradient(x,y,(0.4*w),x+(w*0.1),y,(0.7*w));
            }
            else if(selectedGlassType == 'dark_tint' ){
                    var win_grad = ctx.createLinearGradient(x+(0.2*w), y+(0.4*w), x+(0.6*w), (0.6*w));   
            }
            else{
                win_grad = ctx.createRadialGradient(200,15,20,200,10,140);
            }
        }
        
        

        if(selectedGlassType == 'dark_tint'){
            win_grad.addColorStop(0,"rgb(28, 28, 23)");
            win_grad.addColorStop(.6,"rgb(57, 57, 45)");
            win_grad.addColorStop(1,"rgb(28, 28, 23)");
        }
        else if(selectedGlassType == 'frost' ){
            win_grad.addColorStop(0,"rgb(220, 221, 215)");
            win_grad.addColorStop(.6,"rgb(232, 232, 227)");
            win_grad.addColorStop(1,"rgb(220, 221, 215)");
        }
        else if(selectedGlassType == 'clear'){
            win_grad.addColorStop(0,"rgb(128, 197, 239)");
            win_grad.addColorStop(.9,"rgb(74, 90, 127)");
        }
        
        ctx.fillStyle = win_grad;
    }

    



    // ============================================================================================
    // ================================Short panel --- clear, darktint, frost======================
    // ============================================================================================





    function shortPanel_darkTint(margin_y, p_count, p_wdth, p_hght, p_spacing, panel_y, b_edge){
        
        // windows(margin_y);
        for(i=0; i<p_count; i++){
            panel_x = end_stile_spacing
                    
            if(i!=0){
                panel_x = end_stile_spacing+(p_wdth+c_spacing)*i
            }
            
            windows_SPDrktnt(panel_x, panel_y, p_wdth, p_hght, i, p_count, b_edge);
            // window_clear(panel_x, panel_y, p_wdth, p_hght, i)
        }


        function window_frame_shadows(x, margin_y, window_w,w_border_size){
            //left shadow_dark
            
        }

        function window_frame_SPDrktnt(x, margin_y, window_w, window_h, b_edge){
            // base rectangle
            //ctx.fillStyle = '#9a8f7e';
            ctx.fillStyle = base_color;
            ctx.fillRect(x, margin_y, window_w, window_h);

            // outer layer for clipping
            //ctx.lineWidth = (0.1*b_edge);
            //ctx.strokeStyle = 'transparent';
            ctx.rect(x, margin_y, window_w, window_h);
           //ctx.stroke();

            ctx.save();
            ctx.clip();

            // section under clipping
            //ctx.lineWidth = b_edge/2;
            // ctx.strokeStyle = '#9e9383';
            // ctx.strokeStyle = base_color;
            ctx.strokeRect(x, margin_y, window_w, window_h);

            w_border_size = (0.4*b_edge)

            dark_shadow_SPDrktnt(x+w_border_size, margin_y+w_border_size, margin_y+window_h-w_border_size, (0.3*w_border_size), darker2, 'ls');
            dark_shadow_SPDrktnt(x+(0.8*w_border_size), margin_y+(0.8*w_border_size), margin_y+window_h-(0.8*w_border_size), (0.3*w_border_size), darker1, 'ls');
            // left shadow_light
            dark_shadow_SPDrktnt(x, margin_y, margin_y+window_h, (0.4*w_border_size), lighter2, 'ls');
            dark_shadow_SPDrktnt(x+(0.3*w_border_size), margin_y+(0.3*w_border_size), margin_y+window_h-(0.3*w_border_size), (0.2*w_border_size), lighter1, 'ls');

            //right shadow_light
            dark_shadow_SPDrktnt(x+window_w-w_border_size, margin_y+w_border_size, margin_y+window_h-(0.9*w_border_size), (0.3*w_border_size), lighter2, 'ls');
            dark_shadow_SPDrktnt(x+window_w-(0.8*w_border_size), margin_y+(0.8*w_border_size), margin_y+window_h-(0.6*w_border_size), (0.21*w_border_size), lighter1, 'ls');
            //right shadow_dark
            dark_shadow_SPDrktnt(x+window_w-(0.3*w_border_size), margin_y+(0.3*w_border_size), margin_y+window_h-(0.3*w_border_size), (0.3*w_border_size), darker1, 'ls');
            dark_shadow_SPDrktnt(x+window_w, margin_y, margin_y+window_h,(0.4*w_border_size), darker2, 'ls');

            // top_shadow_dark
            dark_shadow_SPDrktnt(x+(0.8*w_border_size), margin_y+(0.8*w_border_size), x+window_w-(0.8*w_border_size), (0.4*w_border_size), darker1, 'ts');
            dark_shadow_SPDrktnt(x+w_border_size, margin_y+w_border_size, x+window_w-w_border_size, (0.2*w_border_size), darker2, 'ts');
            // top_shadow_light
            dark_shadow_SPDrktnt(x+(0.3*w_border_size), margin_y+(0.3*w_border_size), x+window_w-(0.3*w_border_size), (0.3*w_border_size), lighter1, 'ts');
            dark_shadow_SPDrktnt(x, margin_y, x+window_w, (0.3*w_border_size), lighter1, 'ts');

            // bottom shadow_dark
            dark_shadow_SPDrktnt(x+(0.3*w_border_size), margin_y+window_h-(0.3*w_border_size), x+window_w-(0.3*w_border_size), (0.3*w_border_size), darker1, 'ts');
            dark_shadow_SPDrktnt(x, margin_y+window_h-(0.2*w_border_size), x+window_w, (0.2*w_border_size), darker2, 'ts');
            // bottom shadow_light
            dark_shadow_SPDrktnt(x+w_border_size, margin_y+window_h-w_border_size, x+window_w-w_border_size, (0.3*w_border_size), lighter1, 'ts');
            dark_shadow_SPDrktnt(x+(0.8*w_border_size), margin_y+window_h-(0.8*w_border_size), x+window_w-(0.8*w_border_size), (0.2*w_border_size), lighter1, 'ts');

            ctx.restore();
        }

        function inner_frame_SPDrktnt(inner_x, inner_y, frame_width, frame_height, b_edge){
            // outer layer for clipping
            ctx.lineWidth = (0.1*b_edge);
            ctx.strokeStyle = base_color;
            ctx.rect(inner_x, inner_y, frame_width, frame_height);
            ctx.stroke();

            ctx.save();
            ctx.clip();

            w_border_size = b_edge
            // section under clipping
            ctx.lineWidth = (0.1*w_border_size);
            ctx.strokeStyle = 'transparent';
            // ctx.strokeStyle = 'white';
            ctx.strokeRect(inner_x, inner_y, frame_width, frame_height);

            //left shadow_light
            dark_shadow_SPDrktnt(inner_x, inner_y, inner_y+frame_height, (0.1*w_border_size), lighter2, 'ls');
            dark_shadow_SPDrktnt(inner_x+(0.1*w_border_size), inner_y+(0.1*w_border_size), inner_y+frame_height-(0.1*w_border_size),(0.1*w_border_size), lighter1, 'ls');
            //left shadow_dark
            //dark_shadow_SPDrktnt(inner_x+(0.1*w_border_size), inner_y+(0.1*w_border_size), inner_y+frame_height-(0.1*w_border_size), (0.1*w_border_size), darker1, 'ls');
            dark_shadow_SPDrktnt(inner_x+(0.2*w_border_size), inner_y+(0.2*w_border_size), inner_y+frame_height-(0.2*w_border_size), (0.1*w_border_size), darker1, 'ls');

            //right shadow_light
            dark_shadow_SPDrktnt(inner_x+frame_width-(0.2*w_border_size), inner_y+(0.2*w_border_size), inner_y+frame_height-(0.2*w_border_size), (0.1*w_border_size), lighter1, 'ls');
            //dark_shadow_SPDrktnt(inner_x+frame_width-(0.4*w_border_size), inner_y-(0.3*w_border_size), inner_y+frame_height-(0.3*w_border_size), (0.1*w_border_size), lighter1, 'ls');
            //right shadow_dark
            dark_shadow_SPDrktnt(inner_x+frame_width-(0.1*w_border_size), inner_y+(0.1*w_border_size), inner_y+frame_height-(0.1*w_border_size), (0.1*w_border_size), darker1, 'ls');
            dark_shadow_SPDrktnt(inner_x+frame_width, inner_y, inner_y+frame_height,(0.1*w_border_size), darker2, 'ls');

            // top_shadow_dark
            dark_shadow_SPDrktnt(inner_x, inner_y, inner_x+frame_width, (0.1*w_border_size), lighter1, 'ts');
            dark_shadow_SPDrktnt(inner_x+(0.1*w_border_size), inner_y+(0.1*w_border_size), inner_x+frame_width-(0.1*w_border_size), (0.1*w_border_size), lighter2, 'ts');
            // top_shadow_light
            //dark_shadow_SPDrktnt(inner_x+(0.1*w_border_size), inner_y+(0.1*w_border_size), inner_x+frame_width-(0.1*w_border_size), (0.1*w_border_size), darker1, 'ts');
            dark_shadow_SPDrktnt(inner_x+(0.2*w_border_size), inner_y+(0.2*w_border_size), inner_x+frame_width-(0.2*w_border_size), (0.1*w_border_size), darker1, 'ts');

            // bottom_shadow_light
            dark_shadow_SPDrktnt(inner_x+(0.2*w_border_size), inner_y+frame_height-(0.2*w_border_size), inner_x+frame_width-(0.2*w_border_size), (0.1*w_border_size), lighter1, 'ts');
            //dark_shadow_SPDrktnt(inner_x+(0.3*w_border_size), inner_y+frame_height-(0.3*w_border_size), inner_x+frame_width-(0.3*w_border_size), (0.1*w_border_size), lighter1, 'ts');
            // bottom_shadow_dark
            dark_shadow_SPDrktnt(inner_x+(0.1*w_border_size), inner_y+frame_height-(0.1*w_border_size), inner_x+frame_width-(0.1*w_border_size), (0.1*w_border_size), darker1, 'ts');
            dark_shadow_SPDrktnt(inner_x, inner_y+frame_height-(0.1*w_border_size), inner_x+frame_width, (0.1*w_border_size), darker1, 'ts');
            

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

        function glass_frame_SPDrktnt(frame_x, frame_y, end_x, end_y, count, window_w, window_h){
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

                ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                               
                ctx.fillRect(frame_x, end_y, window_w, window_h);
                ctx.fill();

            ctx.restore();
        }

        function windows_SPDrktnt(frame_x, margin_y, window_w, window_h, count, p_count, b_edge){  

            if(count>=0 && count<=p_count){
                window_frame_SPDrktnt(frame_x, margin_y, window_w, window_h, b_edge);
                inner_frame_SPDrktnt(frame_x+(0.4*b_edge), margin_y+(0.4*b_edge), window_w-(0.8*b_edge), window_h-(0.8*b_edge), b_edge);
                
                glass_frame_SPDrktnt(frame_x+(0.6*b_edge), margin_y+window_h-(0.6*b_edge), frame_x+window_w-(0.6*b_edge), margin_y+(0.6*b_edge), count, window_w, window_h);
                               
            }
        }   
    }




    // =====================================================================================================
    // -----------------------------------------short panel stockton---------------------------
    // =====================================================================================================

    
    function shortPanel_stockton(margin_y, p_count, p_wdth, p_hght, p_spacing, panel_y, bev_edge){
        for(p_ston=0; p_ston<p_count; p_ston++){
            panel_x = end_stile_spacing
                    
            if(p_ston!=0){
                panel_x = end_stile_spacing+(p_wdth+c_spacing)*p_ston
            }
            windows_stockton(panel_x, panel_y, p_wdth, p_hght, p_count, bev_edge, p_ston);
        }

        function windows_stockton(margin_x, margin_y, window_w, window_h, p_count, bev_edge, count){
            if(count>=0 && count<=p_count){
                window_frame_SPStckn(margin_x, margin_y, window_w, window_h, bev_edge);
                inner_frame_SPStckn(margin_x+(0.4*bev_edge), margin_y+(0.4*bev_edge), window_w-(0.8*bev_edge), window_h-(0.8*bev_edge), bev_edge);

                glass_frame_SPStckn(margin_x+(0.6*bev_edge), margin_y+window_h-(0.6*bev_edge), margin_x+window_w-(0.6*bev_edge), margin_y+(0.6*bev_edge), count, bev_edge);
                    
                
            }
            
            function glass_frame_SPStckn(frame_x, frame_y, end_x, end_y, count, b_e){
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

                    ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                    ctx.fillRect(frame_x, end_y, window_w, window_h);
                    ctx.fill();

                    if(selectedWindow == 'sp_stockton' || selectedWindow == 'stktn' || selectedWindow == 'thames'){
                        decraTrim_SPStckn(frame_x, end_y, window_w, window_h, b_e);
                    }
                    else if(selectedWindow =='sp_prairie' || selectedWindow == 'prr'){
                        decraTrim_SPPrre(frame_x, end_y, window_w, window_h, b_e);
                    }
                    else if(selectedWindow =='sp_waterford' || selectedWindow == 'wtrfd'){
                        decraTrim_wtrfd(frame_x, end_y, window_w, window_h, b_e);
                    }
                    
                ctx.restore();
            }

            
            function inner_frame_SPStckn(inner_x, inner_y, frame_width, frame_height, b){
                // outer layer for clipping
                ctx.lineWidth = (0.042*b);
                ctx.strokeStyle = base_color;
                ctx.rect(inner_x, inner_y, frame_width, frame_height);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                // section under clipping
                ctx.lineWidth = (0.34*b);
                ctx.strokeStyle = base_color;
                ctx.strokeRect(inner_x, inner_y, frame_width, frame_height);

                //left shadow_light
                dark_shadow_SPStckn(inner_x, inner_y, inner_y+frame_height, (0.084*b), lighter2, 'ls');
                dark_shadow_SPStckn(inner_x+(0.084*b), inner_y+(0.084*b), inner_y+frame_height-(0.084*b),(0.084*b), lighter1, 'ls');
                //left shadow_dark
                dark_shadow_SPStckn(inner_x+(0.13*b), inner_y+(0.13*b), inner_y+frame_height-(0.13*b), (0.042*b), darker2, 'ls');
                dark_shadow_SPStckn(inner_x+(0.21*b), inner_y+(0.21*b), inner_y+frame_height-(0.21*b),(0.042*b), darker1, 'ls');

                //right shadow_light
                dark_shadow_SPStckn(inner_x+frame_width-(0.21*b), inner_y+(0.21*b), inner_y+frame_height-(0.21*b), (0.084*b), lighter2, 'ls');
                dark_shadow_SPStckn(inner_x+frame_width-(0.17*b), inner_y-(0.13*b), inner_y+frame_height-(0.13*b), (0.042*b), lighter1, 'ls');
                //right shadow_dark
                dark_shadow_SPStckn(inner_x+frame_width-(0.084*b), inner_y+(0.084*b), inner_y+frame_height-(0.084*b), (0.084*b), darker1, 'ls');
                dark_shadow_SPStckn(inner_x+frame_width, inner_y, inner_y+frame_height, (0.084*b), darker2, 'ls');

                // top_shadow_dark
                dark_shadow_SPStckn(inner_x, inner_y, inner_x+frame_width, (0.084*b), lighter2, 'ts');
                dark_shadow_SPStckn(inner_x+(0.084*b), inner_y+(0.084*b), inner_x+frame_width-(0.084*b), (0.042*b), lighter1, 'ts');
                // top_shadow_light
                dark_shadow_SPStckn(inner_x+(0.21*b), inner_y+(0.21*b), inner_x+frame_width-(0.21*b), (0.042*b), darker2, 'ts');
                dark_shadow_SPStckn(inner_x+(0.13*b), inner_y+(0.17*b), inner_x+frame_width-(0.17*b), (0.084*b), darker1, 'ts');

                // bottom_shadow_light
                dark_shadow_SPStckn(inner_x+(0.21*b), inner_y+frame_height-(0.21*b), inner_x+frame_width-(0.21*b), (0.084*b), lighter2, 'ts');
                dark_shadow_SPStckn(inner_x+(0.13*b), inner_y+frame_height-(0.13*b), inner_x+frame_width-(0.13*b), (0.042*b), lighter1, 'ts');
                // bottom_shadow_dark
                dark_shadow_SPStckn(inner_x+(0.084*b), inner_y+frame_height-(0.13*b), inner_x+frame_width-(0.084*b), (0.084*b), darker1, 'ts');
                dark_shadow_SPStckn(inner_x, inner_y+frame_height-(0.042*b), inner_x+frame_width, (0.042*b), darker2, 'ts');
                

                ctx.restore();
            }
            // frame_x, margin_y, window_w, window_h, b_edge);
            function window_frame_SPStckn(x, margin_y, window_w, window_h, b){
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
                ctx.lineWidth = (0.68*b);
                ctx.strokeStyle = base_color;
                // ctx.strokeStyle = 'white';
                ctx.strokeRect(x, margin_y, window_w, window_h);

                //left shadow_dark
                dark_shadow_SPStckn(x+(0.34*b), margin_y+(0.34*b), margin_y+window_h-(0.34*b), (0.084*b), darker2, 'ls');
                dark_shadow_SPStckn(x+(0.25*b), margin_y+(0.25*b), margin_y+window_h-(0.25*b),(0.084*b), darker1, 'ls');
                // left shadow_light
                dark_shadow_SPStckn(x, margin_y, margin_y+window_h, (0.084*b), lighter2, 'ls');
                dark_shadow_SPStckn(x+(0.084*b), margin_y+(0.084*b), margin_y+window_h-(0.084*b), (0.084*b), lighter1, 'ls');

                //right shadow_light
                dark_shadow_SPStckn(x+window_w-(0.34*b), margin_y+(0.34*b), margin_y+window_h-(0.30*b), (0.084*b), lighter2, 'ls');
                dark_shadow_SPStckn(x+window_w-(0.25*b), margin_y+(0.25*b), margin_y+window_h-(0.21*b), (0.042*b), lighter1, 'ls');
                //right shadow_dark
                dark_shadow_SPStckn(x+window_w-(0.084*b), margin_y+(0.084*b), margin_y+window_h-(0.084*b), (0.084*b), darker1, 'ls');
                dark_shadow_SPStckn(x+window_w, margin_y, margin_y+window_h,(0.084*b), darker2, 'ls');

                // top_shadow_dark
                dark_shadow_SPStckn(x+(0.25*b), margin_y+(0.25*b), x+window_w-(0.25*b), (0.084*b), darker1, 'ts');
                dark_shadow_SPStckn(x+(0.34*b), margin_y+(0.34*b), x+window_w-(0.34*b), (0.084*b), darker2, 'ts');
                // top_shadow_light
                dark_shadow_SPStckn(x+(0.084*b), margin_y+(0.084*b), x+window_w-(0.084*b), (0.084*b), lighter1, 'ts');
                dark_shadow_SPStckn(x, margin_y, x+window_w, (0.084*b), lighter2, 'ts');

                // bottom shadow_dark
                dark_shadow_SPStckn(x+(0.084*b), margin_y+window_h-(0.17*b), x+window_w-(0.084*b), (0.084*b), darker1, 'ts');
                dark_shadow_SPStckn(x, margin_y+window_h-(0.084*b), x+window_w, (0.084*b), darker2, 'ts');
                // bottom shadow_light
                dark_shadow_SPStckn(x+(0.34*b), margin_y+window_h-(0.34*b), x+window_w-(0.34*b), (0.084*b), lighter2, 'ts');
                dark_shadow_SPStckn(x+(0.25*b), margin_y+window_h-(0.25*b), x+window_w-(0.25*b), (0.042*b), lighter1, 'ts');

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



            function decraTrim_SPStckn(x, y, w, h, b){
                var dt_x = 0;
                for(k=y; k<=(y+h); k+=(h*0.4)){
                    if(k==y){
                        continue;
                    }
                    else{
                        if(selectedWindow == 'sp_stockton'){
                            ctx.beginPath();
                            ctx.lineWidth = (b*0.04);
                            ctx.shadowColor = 'transparent';
                            ctx.lineCap = 'round';
                            ctx.strokeStyle = base_color;
                            ctx.moveTo(x, k);
                            ctx.lineTo(x+w, k);
                            ctx.stroke();

                            ctx.beginPath();
                            ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                            // ctx.strokeStyle = 'red';
                            ctx.lineWidth = (b*0.01);
                            ctx.moveTo(x, k+(b*0.015));
                            ctx.lineTo(x+w, k+(b*0.015));
                            ctx.stroke();
                        }
                        else if(selectedWindow == 'stktn'){
                            ctx.beginPath();
                            ctx.lineWidth = (b*0.015);
                            ctx.shadowColor = 'transparent';
                            ctx.lineCap = 'round';
                            ctx.strokeStyle = base_color;
                            ctx.moveTo(x, k-(b*0.008));
                            ctx.lineTo(x+w, k-(b*0.008));
                            ctx.stroke();

                            ctx.beginPath();
                            ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                            // ctx.strokeStyle = 'red';
                            ctx.lineWidth = (b*0.01);
                            ctx.moveTo(x, k+(b*0.005));
                            ctx.lineTo(x+w, k+(b*0.005));
                            ctx.stroke();
                        }
                    }
                }
                
                if(selectedWindow == 'stktn'){
                    dt_gap = w/6-(b*0.014)
                    for(p=1; p<6; p++){
                        dt_x = dt_gap*p;

                        // shadow ------
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                        // ctx.strokeStyle = 'red';
                        ctx.lineWidth = (b*0.005);
                        ctx.moveTo(x+dt_x+(b*0.01), y);
                        ctx.lineTo(x+dt_x+(b*0.01), y+h-(b*0.08));
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.shadowColor = 'transparent';
                        ctx.strokeStyle = base_color;
                        ctx.lineWidth = (b*0.015);
                        ctx.lineCap = 'round';
                        ctx.moveTo(x+dt_x, y);
                        ctx.lineTo(x+dt_x, y+h-(b*0.08));
                        ctx.stroke();

                        
                    }
                }
                else if(selectedWindow == 'thames'){
                    dt_gap = w/4-(b*0.02)
                    for(p=1; p<4; p++){
                        dt_x = dt_gap*p;

                        // shadow ------
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                        // ctx.strokeStyle = 'red';
                        ctx.lineWidth = (b*0.02);
                        ctx.moveTo(x+dt_x+(b*0.015), y);
                        ctx.lineTo(x+dt_x+(b*0.015), y+h-(b*0.08));
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.shadowColor = 'transparent';
                        ctx.strokeStyle = base_color;
                        ctx.lineWidth = (b*0.03);
                        ctx.lineCap = 'round';
                        ctx.moveTo(x+dt_x, y);
                        ctx.lineTo(x+dt_x, y+h-(b*0.08));
                        ctx.stroke();

                        
                    }
                }
                else if(selectedWindow == 'sp_stockton'){
                    for(m = 0; m<(x+w); m+=x+(w*0.43)){
                        ctx.beginPath();
                        ctx.shadowColor = 'transparent';
                        ctx.strokeStyle = base_color;
                        ctx.lineWidth = (b*0.04);
                        ctx.lineCap = 'round';
                        ctx.moveTo(m, y);
                        ctx.lineTo(m, y+h-(b*0.08));
                        ctx.stroke();
    
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                        // ctx.strokeStyle = 'red';
                        ctx.lineWidth = (b*0.01);
                        ctx.moveTo(m+(b*0.01), y);
                        ctx.lineTo(m+(b*0.01), y+h-(b*0.08));
                        ctx.stroke();
                    }
                }
            }



            


            function decraTrim_SPPrre(x, y, w, h, b){
                if(selectedWindow == 'prr'){
                    l_wdth = (b*0.015);
                }
                else if(selectedWindow == 'sp_prairie'){
                    l_wdth = (b*0.035);
                }
                // for(k=y; k<=(y+h); k+=28.(0.21*b)){
                //dt_count = 0;
                // for(k=y+(h*0.23); k<=(y+h); k+=(h*0.3)){
                var k = y+(h*0.23);
                for(d = 0; d<3; d++){
                    ctx.beginPath();
                    ctx.lineWidth = l_wdth;
                    ctx.shadowColor = 'transparent';
                    ctx.lineCap = 'round';
                    ctx.strokeStyle = base_color;
                    ctx.moveTo(x, k);
                    ctx.lineTo(x+w, k);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                    // ctx.strokeStyle = 'red';
                    ctx.lineWidth = (b*0.01);
                    ctx.moveTo(x, k+1.5);
                    ctx.lineTo(x+w, k+1.5);
                    ctx.stroke();
                    //dt_count++
                    if(selectedWindow == 'sp_prairie'){
                        v_line_sp(x, y, w, h, b, d); 
                    }
                    k=k+(h*0.3);
                }
                
                if(selectedWindow == 'prr'){
                    var v = y;
                    for(s = 0; s<3; s++){
                        var m = x+(w*0.08)
                        for(z = 0; z<4; z++){
                            if(s==1 || s== 3){
                                if(z == 0 || z== 3){
                                    v_line(m, v, w, h, b, s); 
                                }
                            }
                            else{
                                v_line(m, v, w, h, b, s);
                            }
                            if(z == 0 || z==2){
                                m = m+(w*0.34);
                            }
                            else {
                                m = m+(w*0.08);
                            }
                            
                        }
                        
                        if(s==0){
                            v = v+(h*0.26);   
                        }
                        else if(s==1){
                            v = v+(h*0.31);
                        }
                    }
                }

                function v_line(x, y, w, h, b, c){
                   
                        ctx.beginPath();
                        ctx.shadowColor = 'transparent';
                        ctx.strokeStyle = base_color;
                        ctx.lineWidth = l_wdth;
                        ctx.lineCap = 'round';
                        ctx.moveTo(x, y);
                        if(c==0 || c==2){
                            ctx.lineTo(x, y+(h*0.2));
                        }
                        else{
                            ctx.lineTo(x, y+(h*0.25));
                        }
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                        // ctx.strokeStyle = 'red';
                        ctx.lineWidth =  (b*0.01);
                        ctx.moveTo(x+(b*0.005), y);
                        if(c==0 || c==2){
                            ctx.lineTo(x+(b*0.005), y+(h*0.2));
                        }
                        else{
                            ctx.lineTo(x+(b*0.005), y+(h*0.25));
                        }
                        ctx.stroke();
                }
                
                function v_line_sp(x, y, w, h, b, i){
                    for(m = x+(w*0.2); m<(x+w); m+=(w*0.45)){
                        ctx.beginPath();
                        ctx.shadowColor = 'transparent';
                        ctx.strokeStyle = base_color;
                        ctx.lineWidth = l_wdth;
                        ctx.lineCap = 'round';
                        ctx.moveTo(m, y);
                        ctx.lineTo(m, y+h-(b*0.06));
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                        // ctx.strokeStyle = 'red';
                        ctx.lineWidth =  (b*0.01);
                        ctx.moveTo(m+(b*0.01), y);
                        ctx.lineTo(m+(b*0.01), y+h-(b*0.06));
                        ctx.stroke();
                    }
                }
            }


            function decraTrim_wtrfd(x, y, w, h, b){
                if(selectedWindow == 'sp_waterford'){
                    for(n=1; n<=3; n++){
                        if(n==1){
                            hr_line_wtrfd(x, y+(h*0.38), x+(w*0.2));
                        }
                        else if(n==3){
                            hr_line_wtrfd(x+w-(w*0.36), y+(h*0.38), x+w-(w*0.1));
                        }
                        else if(n==2){
                            diagonal_lines_wtrfd(x+(w*0.18), y+(h*0.02), b);
                        }
                    }
                }
                else{
                    
                    var m_x = x;
                    var m_y = y+(h/2)-(0.64*b);
                    for(n=1; n<=5; n++){
                        if(n==1){

                            hr_line_wtrfd(m_x, m_y, m_x+(1.70*b));
                        }
                        else if(n==2){
                            m_x = m_x+(1.61*b);
                            // hr_line_wtrfd(m_x, m_y, m_x+40);
                            diagonal_lines_wtrfd_lp(m_x, m_y, b);
                        }
                        else if(n==3){
                            m_x = m_x+(3.73*b)
                            hr_line_wtrfd(m_x, m_y, m_x+(2.54*b));
                        }
                        else if(n==4){
                            m_x = m_x+(2.54*b);
                            diagonal_lines_wtrfd_lp(m_x, m_y, b);
                        }
                        else if(n==5){
                            m_x = m_x+(3.60*b);
                            hr_line_wtrfd(m_x, m_y, m_x+(1.70*b));
                        }
                            
                        
                        
                    }
                }
        
                function hr_line_wtrfd(x, y, lx){
                    ctx.beginPath();
                    ctx.lineWidth = (0.34*b);
                    ctx.lineCap = 'round';
                    ctx.shadowColor = 'transparent';
                    ctx.strokeStyle = base_color;
                    ctx.moveTo(x, y);
                    ctx.lineTo(lx, y);
                    ctx.stroke();
        
                    if(selectedWindow == 'sp_waterford'){
                        hr_shadow_wtrfd(x, y, lx);
                    }
                    else{
                        hr_shadow_wtrfd_lp(x, y, lx);
                    }
                }

                function diagonal_lines_wtrfd_lp(x, y, b){
                    ctx.beginPath();            
                    ctx.lineWidth = (0.34*b);
                    ctx.strokeStyle = base_color;
                    ctx.moveTo(x, y);
                    ctx.lineTo(x+(1.78*b), y-(1.78*b));
                    ctx.lineTo(x+(3.56*b), y);
                    ctx.lineTo(x+(1.78*b), y+(1.82*b));
                    ctx.lineTo(x, y);
                    ctx.stroke();
        
                    if(selectedWindow == 'sp_waterford'){
                        diagonal_shadow_wtrfd(x, y);
                    }
                    else{
                        diagonal_shadow_wtrfd_lp(x, y);
                    }
        
                } 

                function diagonal_lines_wtrfd(x, y, b){
                    ctx.beginPath();            
                    ctx.lineWidth = (b*0.04);
                    ctx.strokeStyle = base_color;
                    ctx.moveTo(x, y+(h*0.36));
                    ctx.lineTo(x+(w*0.23), y);
                    ctx.lineTo(x+(w*0.46), y+(h*0.36));
                    ctx.lineTo(x+(w*0.23), y+(h*0.72));
                    ctx.lineTo(x, y+(h*0.36));
                    ctx.stroke();
        
                    diagonal_shadow_wtrfd(x, y);
        
                } 
                
                function hr_shadow_wtrfd_lp(x,y, lx){
                    ctx.beginPath();
                    ctx.lineWidth = (0.084*b);
                    ctx.strokeStyle = lighter2;
                    // ctx.strokeStyle = 'red';
                    ctx.moveTo(x, y-(0.13*b));
                    ctx.lineTo(lx, y-(0.13*b));
                    ctx.stroke();
        
                    ctx.beginPath();
                    ctx.lineWidth = (0.084*b);
                    ctx.strokeStyle = darker2;
                    // ctx.strokeStyle = 'green';
                    ctx.moveTo(x, y+(0.13*b));
                    ctx.lineTo(lx, y+(0.13*b));
                    ctx.stroke();
                }

                function hr_shadow_wtrfd(x,y, lx){
                    ctx.beginPath();
                    ctx.lineWidth = (b*0.005);
                    ctx.strokeStyle = lighter2;
                    ctx.moveTo(x, y-(b*0.015));
                    ctx.lineTo(lx, y-(b*0.013));
                    ctx.stroke();
        
                    ctx.beginPath();
                    ctx.lineWidth = (b*0.015);
                    ctx.strokeStyle = darker2;
                    ctx.moveTo(x, y+(b*0.015));
                    ctx.lineTo(lx, y+(b*0.015));
                    ctx.stroke();
                }


                function diagonal_shadow_wtrfd_lp(x, y){
                    ctx.beginPath();
                    ctx.lineWidth = (0.084*b);
                    ctx.strokeStyle = lighter2;
                    // ctx.strokeStyle = 'green';
                    
                    ctx.moveTo(x-(0.084*b), y-(0.13*b));
                    ctx.lineTo(x+(1.53*b), y-(1.70*b));

                    ctx.moveTo(x+(1.78*b), y-(1.53*b));
                    ctx.lineTo(x+(3.30*b), y);

                    ctx.moveTo(x+(3.30*b), y);
                    ctx.lineTo(x+(1.78*b), y+(1.53*b));

                    ctx.moveTo(x+(1.48*b), y+(1.78*b));
                    ctx.lineTo(x-(0.084*b), y+(0.13*b));
                    ctx.stroke();
        
                    ctx.beginPath();
                    ctx.lineWidth = (0.084*b);
                    ctx.strokeStyle = darker2;
                    // ctx.strokeStyle = 'blue';

                    ctx.moveTo(x+(0.25*b), y);
                    ctx.lineTo(x+(1.70*b), y-(1.44*b));

                    ctx.moveTo(x+(2.03*b), y-(1.70*b));
                    ctx.lineTo(x+(3.65*b), y-(0.13*b));

                    ctx.moveTo(x+(3.65*b), y+(0.13*b));
                    ctx.lineTo(x+(2.08*b), y+(1.70*b));

                    ctx.moveTo(x+(1.70*b), y+(1.53*b));
                    ctx.lineTo(x+(0.25*b), y);
                    ctx.stroke();
                }
        
                              
        
                function diagonal_shadow_wtrfd(x, y){
                    ctx.beginPath();
                    ctx.lineWidth = (b*0.015);
                    ctx.strokeStyle = lighter1;
                    // ctx.strokeStyle = 'green';
                    // console.log('b*0.01', b*0.01);
                    // console.log('b*0.01', b*0.03);
                    ctx.moveTo(x, y+(h*0.32));
                    ctx.lineTo(x+(w*0.21), y-(b*0.01));

                    ctx.moveTo(x+(w*0.24), y+(b*0.045));
                    ctx.lineTo(x+(w*0.43), y+(h*0.36));

                    ctx.moveTo(x+(w*0.43), y+(h*0.36));
                    ctx.lineTo(x+(w*0.23), y+(h*0.67));

                    ctx.moveTo(x, y+(h*0.39));
                    ctx.lineTo(x+(w*0.21), y+(h*0.72));
                    ctx.stroke();
        
                    ctx.beginPath();
                    ctx.lineWidth = (b*0.015);
                    ctx.strokeStyle = darker2;
                    // ctx.strokeStyle = 'blue';
                    ctx.moveTo(x+(b*0.03), y+(h*0.36));
                    ctx.lineTo(x+(w*0.23), y+(b*0.03));

                    ctx.moveTo(x+(w*0.25), y);
                    ctx.lineTo(x+(w*0.48), y+(h*0.36));

                    ctx.moveTo(x+(w*0.47), y+(h*0.39));
                    ctx.lineTo(x+(w*0.25), y+(h*0.72));

                    ctx.moveTo(x+(b*0.03), y+(h*0.36));
                    ctx.lineTo(x+(w*0.23), y+(h*0.67));
                    ctx.stroke();
                }
            }

        }
    }


    //=====================================================================================
    // -------------------------Short panel Cascade
    // ===================================================================================

    

    function shortPanel_cascade(margin_y, p_count, p_wdth, p_hght, p_spacing, panel_y, b_edge){
        console.log('panel count -- ', p_count);
        for(var i=0; i<p_count; i++){
            panel_cs = end_stile_spacing
            if(i!=0){
                panel_cs = end_stile_spacing+(p_wdth+c_spacing)*i                
            }
            windows_cascade(panel_cs, panel_y, p_wdth, p_hght, p_count, b_edge, i);
        }

       
        function windows_cascade(margin_x, margin_y, window_w, window_h,p_cnt, b_edge, count){
            // var frame_x = (margin_x+(count*window_w)+(count*margin_x));
            if(count>=0 && count<=p_cnt){
                //window_frame_SPCasd(frame_x);
                window_frame_SPCasd(margin_x, margin_y, window_w, window_h, b_edge);
                // inner_frame_SPCasd(frame_x+13, margin_y+13, window_w-27, window_h-27);
                inner_frame_SPCasd(margin_x+(0.4*b_edge), margin_y+(0.4*b_edge), window_w-(0.8*b_edge), window_h-(0.8*b_edge), b_edge);
                
                
                if(selectedWindow == 'sp_cascade'){   
                    glass_frame_SPCasd(margin_x+(0.75*b_edge), margin_y+window_h-(0.67*b_edge), margin_x+window_w-(0.7*window_w), margin_y+(0.82*b_edge), margin_x+window_w-(2.54*b_edge), margin_y+(0.75*b_edge), margin_x+window_w-(0.79*b_edge), margin_y+(1.89*b_edge), count);
                }
                else if(selectedWindow == 'cascade'){
                    glass_frame_SPCasd(margin_x+(0.75*b_edge), margin_y+window_h-(0.67*b_edge), margin_x+window_w-(0.7*window_w), margin_y+(0.82*b_edge), margin_x+window_w-(5*b_edge), margin_y+(0.65*b_edge), margin_x+window_w-(0.79*b_edge), margin_y+(1.89*b_edge), count);
                }
                else if(selectedWindow == 'ctdl'){
                    // glass_frame_lPCathedral(margin_x+(0.75*b_edge), margin_y+window_h-(0.67*b_edge), window_w, window_h, count);
                    glass_frame_lPCathedral(margin_x, margin_y, window_w, window_h, count, b_edge);
                }
                else if(selectedWindow == 'sp_cathedral'){   
                    glass_frame_sPCathedral(margin_x, margin_y, window_w, window_h, count, b_edge);
                }
                else if(selectedWindow == 'lpml'){
                    glass_frame_SPCasd(margin_x+(0.75*b_edge), margin_y+window_h-(0.67*b_edge), margin_x+window_w-(0.7*window_w), margin_y+(0.82*b_edge), margin_x+window_w-(5*b_edge), margin_y+(0.65*b_edge), margin_x+window_w-(0.79*b_edge), margin_y+(1.89*b_edge), count);
                }
                else if(selectedWindow == 'arch_thm'){
                    glass_frame_SPCasd(margin_x+(0.75*b_edge), margin_y+window_h-(0.67*b_edge), margin_x+window_w-(0.7*window_w), margin_y+(0.82*b_edge), margin_x+window_w-(5*b_edge), margin_y+(0.65*b_edge), margin_x+window_w-(0.79*b_edge), margin_y+(1.89*b_edge), count);
                }
                else if(selectedWindow == 'lpww'){
                    glass_frame_lpww(margin_x, margin_y, window_w, window_h, b_edge, count);
                }
                else if(selectedWindow == 'sp_wagonWheel'){
                    glass_frame_lpww(margin_x, margin_y, window_w, window_h, b_edge, count);
                }
                else if(selectedWindow == 'sp_sunray'){
                    glass_frame_lpww(margin_x, margin_y, window_w, window_h, b_edge, count);
                }                
                else if(selectedWindow == 'sunray' ){
                    glass_frame_lpww(margin_x, margin_y, window_w, window_h, b_edge, count);
                }
            }


            function sp_ww(x, y, w, h, b, c){
                if(c%2){                    
                    ctx.beginPath();
                    ctx.strokeStyle = base_color;
                    ctx.moveTo(x+w-15, y+h-15);
                    ctx.quadraticCurveTo(x+w-60, y+15, x+15, y+15)
                    ctx.lineTo(x+15, y+h-35);
                    ctx.quadraticCurveTo(x+30, y+h-33, x+35, y+h-15);
                    ctx.lineTo(x+w-15, y+h-15);
                    ctx.stroke();
                } 
                else{
                    ctx.beginPath();
                    ctx.strokeStyle = base_color;
                    ctx.moveTo(x+15, y+h-15);
                    //ctx.bezierCurveTo(x+50, y+20, x+100, y+50, x+w-15, y+15);
                    ctx.quadraticCurveTo(x+60, y+15, x+w-15, y+15)
                    ctx.lineTo(x+w-15, y+h-35);
                    ctx.quadraticCurveTo(x+w-30, y+h-33, x+w-35, y+h-15);
                    ctx.lineTo(x+15, y+h-15);
                    ctx.stroke();

                }
            }

            function glass_frame_lpww(x, y, w, h, b, c){
                p_size = (x+w-(0.85*b))-(x+(0.85*b));               

                if(selectedWindow == 'lpww'){
                    ctx.beginPath();
                    ctx.strokeStyle = base_color;
                    ctx.moveTo(x+(0.55*b), y+h-(0.64*b));
                    ctx.bezierCurveTo(x+(2.46*b), y-(0.42*b), x+w-(2.46*b), y-(0.42*b), x+w-(0.64*b), y+h-(0.64*b));
                    ctx.lineTo(x+(w/2)+(0.72*b), y+h-(0.64*b));
                    ctx.bezierCurveTo(x+(w/2)+(0.64*b), y+h-(1.48*b), x+(w/2)-(0.76*b), y+h-(1.48*b), x+(w/2)-(0.85*b), y+h-(0.64*b));
                    ctx.lineTo(x+(0.55*b), y+h-(0.64*b));
                    ctx.stroke();                
                }
                else if(selectedWindow == 'sp_wagonWheel' || selectedWindow == 'sunray'){
                    // sp_ww(x, y, w, h, b, c); 

                    if(c%2){                    
                        ctx.beginPath();
                        ctx.strokeStyle = base_color;
                        ctx.moveTo(x+w-(0.64*b), y+h-(0.64*b));
                        ctx.quadraticCurveTo(x+w-(2.54*b), y+(0.64*b), x+(0.64*b), y+(0.64*b));
                        ctx.lineTo(x+(0.64*b), y+h-(1.48*b));
                        ctx.quadraticCurveTo(x+(1.27*b), y+h-(1.40*b), x+(1.48*b), y+h-(0.64*b));
                        ctx.lineTo(x+w-(0.64*b), y+h-(0.64*b));
                        ctx.stroke();
                    } 
                    else{
                        ctx.beginPath();
                        ctx.strokeStyle = base_color;
                        ctx.moveTo(x+(0.64*b), y+h-(0.64*b));
                        ctx.quadraticCurveTo(x+(2.54*b), y+(0.64*b), x+w-(0.64*b), y+(0.64*b))
                        ctx.lineTo(x+w-(0.64*b), y+h-(1.48*b));
                        ctx.quadraticCurveTo(x+w-(1.27*b), y+h-(1.40*b), x+w-(1.48*b), y+h-(0.64*b));
                        ctx.lineTo(x+(0.64*b), y+h-(0.64*b));
                        ctx.stroke();
    
                    }
                }
                else if(selectedWindow == 'sp_sunray'){
                    function spsunray_shape(x1, y1, q_x1, q_y1, x2, y2, x3, y3, q_x2, q_y2, x4, y4, x5, y5){
                        ctx.beginPath();
                        ctx.strokeStyle = 'transparent';
                        ctx.moveTo(x1, y1);
                        ctx.quadraticCurveTo(q_x1, q_y1, x2, y2);
                        ctx.lineTo(x3,y3);
                        if(q_x2!=0 && q_y2!=0 && x4!=0 && y4!=0){
                            ctx.quadraticCurveTo(q_x2, q_y2, x4, y4);
                        }
                        ctx.lineTo(x5, y5);
                        ctx.stroke();
                    }
                    
                    if(c == 0 || c == 4){
                        spsunray_shape(x+(0.64*b), y+h-(0.64*b), x+(1.70*b), y+(2.12*b), x+w-(0.64*b), y+(1.27*b), x+w-(0.64*b), y+h-(0.64*b), 0, 0, 0, 0, x+(0.64*b), y+h-(0.64*b));
                    }
                    else if(c == 1 || c == 5){
                        spsunray_shape(x+(0.64*b), y+(0.97*b), x+(2.12*b), y+(0.68*b), x+w-(0.64*b), y+(0.64*b), x+w-(0.64*b), y+h-(1.48*b) , x+w-(1.27*b), y+h-(1.40*b), x+w-(1.48*b), y+h-(0.64*b)  , x+(0.64*b), y+h-(0.64*b));                        
                    }
                    if(c == 2 || c == 6){                       
                        spsunray_shape(x+w-(0.64*b), y+(0.97*b)  , x+w-(2.12*b), y+(0.68*b), x+(0.64*b), y+(0.64*b)  , x+(0.64*b), y+h-(1.48*b)  , x+(1.27*b), y+h-(1.40*b), x+(1.48*b), y+h-(0.64*b)  , x+w-(0.64*b), y+h-(0.64*b));                        
                    }
                    else if(c == 3 || c == 7){                        
                        spsunray_shape(x+w-(0.64*b), y+h-(0.64*b)   , x+w-(1.70*b), y+(2.12*b), x+(0.64*b), y+(1.27*b)  , x+(0.64*b), y+h-(0.64*b)  , 0, 0, 0, 0  , x+w-(0.64*b), y+h-(0.64*b));
                        
                    }
                }

                ctx.save();
                ctx.clip();

                    ctx.fillStyle = rad_grad(x, y, w, h, c);
                    ctx.fillRect(x, y-(4.24*b), w, h);
                    ctx.fill();                   

                    if(selectedWindow == 'lpww'){
                        curve_shadows(x+(0.64*b), y+h-(0.64*b), x+(2.63*b), y-(0.34*b), x+w-(2.59*b), y-(0.34*b), x+w-(0.72*b), y+h-(0.64*b), darker3, b);                        
                        decraTrim_lp_wagonwheel(x, y, w, h, x+(w/2), b);                        
                    }
                    else if(selectedWindow == 'sunray' || selectedWindow == 'sp_wagonWheel'){
                        if(c%2){
                            ctx.beginPath();
                            curve_shadows_sp(x+w-(0.68*b), y+h-(0.64*b), x+w-(2.59*b), y+(0.68*b), x+(0.64*b), darker3, c)
                            ctx.stroke();
                            decraTrim_sp_wagonwheel(x, y, w, h, x+(w/2), b, c%2);  
                        }
                        else{
                            ctx.beginPath();
                            curve_shadows_sp(x+(0.68*b), y+h-(0.64*b), x+(2.59*b), y+(0.68*b), x+w-(0.64*b), darker3, c)
                            ctx.stroke();
                            decraTrim_sp_wagonwheel(x, y, w, h, x+(w/2), b, c%2);
                        }
                    }
                    else if(selectedWindow == 'sp_sunray'){
                        if(c == 0 || c == 4){
                            curve_shadows_sps(x+(0.68*b), y+h-(0.64*b), x+(1.78*b), y+(2.12*b), x+w-(0.64*b), y+(1.31*b), darker3);
                            decraTrim_sp_sunray(x+(2.54*b), y+(1.78*b), x+w-(0.64*b), y+(2.54*b), b); 
                        }
                        else if(c == 1 || c == 5){
                            // curve_shadows_sps(x+15, y+23, x+50, y+16, x+w-15, y+15, darker3);
                            curve_shadows_sps(x+(0.64*b), y+(1.02*b), x+(2.12*b), y+(0.68*b), x+w-(0.64*b), y+(0.68*b), darker3);
                            decraTrim_sp_sunray(x+(0.64*b), y+h-(1.90*b), x+w-(1.27*b), y+h-(0.93*b), b);  
                            decraTrim_sp_sunray(x+(3.82*b), y+(0.64*b), x+w-(0.85*b), y+h-(1.19*b), b);  
                        }
                        if(c == 2 || c == 6){  
                            curve_shadows_sps(x+w-(0.64*b), y+(1.02*b), x+w-(2.12*b), y+(0.68*b), x+(0.64*b), y+(0.68*b), darker3);                     
                            decraTrim_sp_sunray(x+w-(0.64*b), y+h-(1.90*b), x+(1.27*b), y+h-(0.93*b), b); 
                            decraTrim_sp_sunray(x+w-(3.82*b), y+(0.64*b), x+(0.85*b), y+h-(1.19*b), b);  
                        }
                        else if(c == 3 || c == 7){      
                            curve_shadows_sps(x+w-(0.68*b), y+h-(0.64*b), x+w-(1.78*b), y+(2.12*b), x+(0.64*b), y+(1.31*b), darker3);                  
                            decraTrim_sp_sunray(x+w-(2.54*b), y+(1.78*b), x+(0.64*b), y+(2.54*b), b);  
                            
                        }
                    }

                ctx.restore();

                function curve_shadows_sps(x1, y1, q_x1, q_y1, x2, y2, shades){
                    ctx.beginPath();
                    ctx.strokeStyle = shades;
                    ctx.moveTo(x1, y1);
                    ctx.quadraticCurveTo(q_x1, q_y1, x2, y2)
                    ctx.stroke();
                }

                function decraTrim_sp_sunray(x1, y1, x2, y2, b){
                    ctx.beginPath();
                    ctx.lineWidth = (0.25*b);
                    ctx.strokeStyle = base_color;
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }

                

                
                
                

                if(selectedWindow == 'lpww'){
                    // curve_shadows(x+(0.55*b), y+h-(0.64*b), x+(2.46*b), y-(0.42*b), x+w-(2.46*b), y-(0.42*b), x+w-(0.68*b), y+h-(0.64*b), darker2);
                    // curve_shadows(x+(0.55*b), y+h-(0.93*b), x+(2.63*b), y-(0.47*b), x+w-(.63*b), y-(0.47*b), x+w-(0.64*b), y+h-(0.85*b), lighter1, b);
                    curve_shadows(x+(0.59*b), y+h-(0.93*b), x+(2.54*b), y-(0.47*b), x+w-(2.54*b), y-(0.51*b), x+w-(0.64*b), y+h-(0.85*b), lighter1, b);                        
                    curve_shadows(x+(0.59*b), y+h-(0.64*b), x+(2.46*b), y-(0.42*b), x+w-(2.46*b), y-(0.42*b), x+w-(0.68*b), y+h-(0.68*b), lighter2, b);

                    curve_shadows(x+(w/2)+(0.76*b), y+h-(0.64*b), x+(w/2)+(0.64*b), y+h-(1.48*b), x+(w/2)-(0.76*b), y+h-(1.48*b), x+(w/2)-(0.85*b), y+h-(0.64*b), darker2, b);
                    curve_shadows(x+(w/2)+(0.85*b), y+h-(0.64*b), x+(w/2)+(0.64*b), y+h-(1.57*b), x+(w/2)-(0.76*b), y+h-(1.57*b), x+(w/2)-(0.93*b), y+h-(0.64*b), lighter1, b);

                    for(d=1; d<=2; d++){
                        if(d==1){
                            frame_triangles_lpww(x+(0.59*b), y+(0.85*b), x+(4.66*b), x+(2.12*b), h, d, b);
                        }
                        else{
                            frame_triangles_lpww(x+w-(0.76*b), y+(0.85*b), x+w-(4.66*b), x+w-(2.33*b), h, d, b);
                        }            
                    }
                }
                else if(selectedWindow == 'sp_wagonWheel' || selectedWindow == 'sunray'){
                    if(c%2){
                        curve_shadows_sp(x+w-(0.59*b), y+h-(0.64*b), x+w-(2.54*b), y+(0.64*b), x+(0.59*b), lighter2, c)
                        // frame_triangles_spww(x+w-(0.76*b), y+(0.85*b), x+w-(4.66*b), x+w-(2.33*b), h, b);
                        frame_triangles_spww(x+w-(0.72*b), y+(0.72*b), x+(2.75*b), x+w-(2.54*b), y+(0.85*b), w, h, c, b);
                    }
                    else{
                        curve_shadows_sp(x+(0.59*b), y+h-(0.64*b), x+(2.50*b), y+(0.64*b), x+w-(0.59*b), lighter2, c)
                        frame_triangles_spww(x+(0.72*b), y+(0.72*b), x+w-(2.75*b), x+(2.54*b), y+(0.85*b), w, h, c, b);
                    }

                
                }
                else if(selectedWindow == 'sp_sunray'){                    
                    if(c==0 || c==4){
                        curve_shadows_sps(x+(0.59*b), y+h-(0.76*b), x+(1.57*b), y+(2.04*b), x+w-(0.64*b), y+(1.10*b), lighter1);
                        frame_triangles_spSunray(x, y, w, h, c, b);
                    }  
                    else if(c==1 || c==5){
                        curve_shadows_sps(x+(0.59*b), y+(0.85*b), x+(2.12*b), y+(0.59*b), x+w-(0.64*b), y+(0.51*b), lighter2);
                    }
                    else if(c==2 || c==6){
                        curve_shadows_sps(x+w-(0.59*b), y+(0.85*b), x+w-(2.12*b), y+(0.59*b), x+(0.64*b), y+(0.51*b), lighter2);
                    }                  
                    else if(c==3 || c==7){
                        curve_shadows_sps(x+w-(0.59*b), y+h-(0.76*b), x+w-(1.57*b), y+(2.04*b), x+(0.64*b), y+(1.10*b), darker1);
                        frame_triangles_spSunray_2(x, y, w, h, c, b);
                    }
                }
            }

            

            function frame_triangles_spSunray_2(x, y, w, h, c, b ){
                ctx.beginPath();
                ctx.strokeStyle = 'transparent';
                ctx.fillStyle = 'green';
                ctx.fillStyle = darker2;
                ctx.moveTo(x+w-(0.72*b), y+(0.72*b));
                ctx.lineTo(x+w-(0.72*b), y+h-(1.36*b));
                ctx.lineTo(x+w-(0.89*b), y+h-(1.78*b));
                ctx.lineTo(x+w-(0.89*b), y+(0.89*b));
                ctx.lineTo(x+w-(0.72*b), y+(0.72*b));
                ctx.fill();

                ctx.beginPath();
                ctx.strokeStyle = 'transparent';
                ctx.fillStyle = 'red';
                ctx.fillStyle = darker1;
                ctx.moveTo(x+w-(0.72*b), y+(0.72*b));
                ctx.lineTo(x+(0.89*b), y+(0.72*b));
                ctx.lineTo(x+(2.16*b), y+(0.89*b));
                ctx.lineTo(x+w-(0.89*b), y+(0.89*b));
                ctx.lineTo(x+w-(0.72*b), y+(0.72*b));
                ctx.fill();

                ctx.beginPath();
                ctx.strokeStyle = 'transparent';
                ctx.fillStyle = 'blue';
                ctx.fillStyle = lighter1;
                ctx.moveTo(x+(2.16*b), y+(0.89*b));
                ctx.quadraticCurveTo(x+w-(2.12*b), y+(1.70*b), x+w-(0.89*b), y+h-(1.78*b));
                ctx.lineTo(x+w-(0.72*b), y+h-(1.36*b));
                ctx.quadraticCurveTo(x+w-(1.90*b), y+(1.70*b), x+(0.89*b), y+(0.72*b));
                ctx.lineTo(x+(2.16*b), y+(0.89*b));
                // ctx.lineTo(x+21, y+21);
                // ctx.lineTo(x+17, y+17);
                ctx.fill();

                ctx.beginPath();
                ctx.fillStyle = 'transparent';
                ctx.fillRect(x, y, 5, 5);
                ctx.fill();
            }

            function frame_triangles_spSunray(x, y, w, h, c, b ){
                ctx.beginPath();
                ctx.strokeStyle = 'transparent';
                ctx.fillStyle = 'green';
                ctx.fillStyle = lighter1;
                ctx.moveTo(x+(0.72*b), y+(0.72*b));
                ctx.lineTo(x+(0.72*b), y+h-(1.36*b));
                ctx.lineTo(x+(0.89*b), y+h-(1.78*b));
                ctx.lineTo(x+(0.89*b), y+(0.89*b));
                ctx.lineTo(x+(0.72*b), y+(0.72*b));
                ctx.fill();

                ctx.beginPath();
                ctx.strokeStyle = 'transparent';
                ctx.fillStyle = 'red';
                ctx.fillStyle = darker1;
                ctx.moveTo(x+(0.72*b), y+(0.72*b));
                ctx.lineTo(x+w-(0.89*b), y+(0.72*b));
                ctx.lineTo(x+w-(2.16*b), y+(0.89*b));
                ctx.lineTo(x+(0.89*b), y+(0.89*b));
                ctx.lineTo(x+(0.72*b), y+(0.72*b));
                ctx.fill();

                ctx.beginPath();
                ctx.strokeStyle = 'transparent';
                ctx.fillStyle = 'blue';
                ctx.fillStyle = darker2;
                ctx.moveTo(x+w-(2.16*b), y+(0.89*b));
                ctx.quadraticCurveTo(x+(2.12*b), y+(1.70*b), x+(0.89*b), y+h-(1.78*b));
                ctx.lineTo(x+(0.72*b), y+h-(1.36*b));
                ctx.quadraticCurveTo(x+(1.90*b), y+(1.70*b), x+w-(0.89*b), y+(0.72*b));
                ctx.lineTo(x+w-(2.16*b), y+(0.89*b));
                // ctx.lineTo(x+21, y+21);
                // ctx.lineTo(x+17, y+17);
                ctx.fill();

                ctx.beginPath();
                ctx.fillStyle = 'transparent';
                ctx.fillRect(x, y, 5, 5);
                ctx.fill();
            }

            function frame_triangles_spww(x1, y1, x3, q_x1, q_y1, w, h, c, b){
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'transparent';
                ctx.fillStyle = base_color;
                ctx.moveTo(x1, y1);
                ctx.lineTo(x3, y1);
                ctx.quadraticCurveTo(q_x1, q_y1, x1, y1+h-(2.12*b));
                // ctx.lineTo(x+(0.72*b), y+(2.12*b));
                ctx.fill();

                ctx.save();
                ctx.clip();
                    ctx.beginPath();
                    if(c%2 == 0){
                        ctx.fillStyle = lighter1;
                    }
                    else{
                        ctx.fillStyle = darker2;
                    }
                    ctx.strokeStyle = 'transparent';
                    ctx.moveTo(x1, y1);
                    if(c%2 == 0){
                        ctx.lineTo(x1+(0.13*b), y1+(0.13*b));
                        ctx.lineTo(x1+(0.13*b), y1+h-(2.25*b));
                    }
                    else{
                        ctx.lineTo(x1-(0.13*b), y1+(0.13*b));
                        ctx.lineTo(x1-(0.13*b), y1+h-(2.25*b));
                    }
                    ctx.lineTo(x1, y1+h-(2.12*b));
                    ctx.fill();

                    ctx.beginPath();
                    ctx.fillStyle = darker1;
                    // ctx.fillStyle = 'green';
                    ctx.strokeStyle = 'transparent';
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x3, y1);
                    ctx.lineTo(x3-(0.42*b), y1+(0.13*b));
                    ctx.lineTo(x1+(0.13*b), y1+(0.13*b));
                    ctx.fill();

                    ctx.beginPath();
                    ctx.lineWidth = 0;
                    ctx.strokeStyle = 'transparent';
                    if(c%2  == 0){
                        ctx.fillStyle = darker2;
                        // ctx.fillStyle = 'red';
                        ctx.moveTo(x3, y1);
                        ctx.quadraticCurveTo(q_x1, q_y1, x1, y1+h-(2.12*b));
                        ctx.lineTo(x1+(0.13*b), y1+h-(2.54*b));
                        ctx.quadraticCurveTo(x1+(1.70*b), y1+(0.21*b), x1+w-(4.24*b), y1+(0.13*b));
                    }
                    else{
                        ctx.fillStyle = lighter2;
                        // ctx.fillStyle = 'red';
                        ctx.moveTo(x3, y1);
                        ctx.quadraticCurveTo(q_x1, q_y1, x1, y1+h-(2.12*b));
                        ctx.lineTo(x1-(0.13*b), y1+h-(2.54*b));
                        ctx.quadraticCurveTo(x1-(1.70*b), y1+(0.21*b), x1-(3.18*b), y1+(0.13*b));
                    }
                    ctx.fill();

                    ctx.beginPath();
                    ctx.strokeStyle = 'transparent';
                    ctx.fillStyle = 'transparent';
                    ctx.moveTo(10, 10);
                    ctx.lineTo(20, 10);
                    ctx.lineTo(20, 20);
                    ctx.lineTo(10, 20);
                    ctx.fill();
                ctx.restore();
            }

            


            

            

            function decraTrim_sp_wagonwheel(x, y, w, h, end_x, b, c){

                for(q=1; q<=2; q++){
                    dt_lines_lpww(x, y, end_x, q, c);
                    // x = x+(3.39*b);
                }
    
                function dt_lines_lpww(sx, y, ex, count, c){
                    ctx.beginPath();
                    ctx.lineWidth = (0.25*b);
                    ctx.strokeStyle = base_color;
                    if(count==1){       
                        if(c == 0){    
                            if(selectedWindow == 'sunray'){
                                ctx.moveTo(sx, y+(1.70*b));
                                ctx.lineTo(sx+w, y+h-(0.72*b));
                            }
                            else{
                                ctx.moveTo(sx, y+(1.70*b));
                                ctx.lineTo(sx+w, y+h-(0.42*b));
                            }                     
                        }
                        else{
                            if(selectedWindow == 'sunray'){                               
                                ctx.moveTo(sx+w, y+(1.70*b));
                                ctx.lineTo(sx, y+h-(0.72*b));
                            }
                            else{
                                ctx.moveTo(sx+w, y+(1.70*b));
                                ctx.lineTo(sx, y+h-(0.42*b));
                            }
                        }
                        // dt_line_shadow_lpww(sx, y+26, sx+w-20, y+h-18, b);
                    }
                    else if(count==2){
                        if(c == 0){    
                            if(selectedWindow == 'sunray'){ 
                                ctx.moveTo(sx+(0.47*w), y);
                                ctx.lineTo(sx+w-(0.42*b), y+h-(0.93*b));                  
                            }
                            else{
                                ctx.moveTo(sx+(3.39*b), y);
                                ctx.lineTo(sx+w-(0.42*b), y+h-(0.85*b));                  
                            }
                        }
                        else{
                            if(selectedWindow == 'sunray'){
                                ctx.moveTo(sx+w-(0.47*w), y);
                                ctx.lineTo(sx+(0.42*b), y+h-(0.93*b));                   
                            }
                            else{
                                ctx.moveTo(sx+w-(3.39*b), y);
                                ctx.lineTo(sx+(0.42*b), y+h-(0.85*b));                   
                            }
                        }
                        // dt_line_shadow_lpww(sx+3, y+5, ex-14, y+h-26, b);
                    
                    }
                    ctx.stroke();

                     
                }
                function dt_line_shadow_lpww(sh_x, sh_y, sh_lx, sh_ly, b){
                    ctx.beginPath();
                    ctx.lineWidth = (0.084*b);
                    ctx.strokeStyle = darker2;
                    ctx.moveTo(sh_x, sh_y);
                    ctx.lineTo(sh_lx, sh_ly);
                    ctx.stroke();
                } 
            }

            function frame_triangles_lpww(x, y, lx, qx, h, d, b){
                ctx.beginPath();
                ctx.lineWidth = (0.084*b);
                ctx.strokeStyle = darker1;
                ctx.moveTo(x+(0.084*b), y);
                ctx.lineTo(lx, y);
                ctx.quadraticCurveTo(qx, y+(0.59*b), x+(0.084*b), y+h-(2.29*b));
                ctx.lineTo(x+(0.084*b), y);
                ctx.stroke();
    
                ctx.save();
                ctx.clip();
    
                    ctx.beginPath();
                    ctx.lineWidth = (0.25*b);
                    ctx.shadowColor = 'transparent';
                    if(d==1){
                        ctx.strokeStyle = lighter2;
                    }
                    else{
                        ctx.strokeStyle = lighter1;
                    }        
                    ctx.moveTo(x+(0.084*b), y);
                    ctx.lineTo(x+(0.084*b), y+h-(2.29*b));
                    ctx.stroke();
    
                    ctx.beginPath();
                    if(d==2){
                        ctx.strokeStyle = darker1;
                    }
                    else{
                        ctx.strokeStyle = darker2;
                    }
                    ctx.moveTo(lx, y);
                    ctx.quadraticCurveTo(qx, y+(0.59*b), x+(0.084*b), y+h-(2.29*b));
                    ctx.stroke();
    
                ctx.restore();
            }


            

            function decraTrim_lp_wagonwheel(x, y, w, h, end_x, b){
                for(q=1; q<6; q++){
                    dt_lines_lpww(x, y, end_x, q);
                    x = x+(3.39*b);
                }
    
                function dt_lines_lpww(sx, y, ex, count){
                    ctx.beginPath();
                    ctx.lineWidth = (0.25*b);
                    ctx.strokeStyle = base_color;
                    if(count==1){                
                        ctx.moveTo(sx, y+(1.48*b));
                        ctx.lineTo(ex, y+h-(0.51*b));                     
                        ctx.stroke();
                        dt_line_shadow_lpww(sx-(1.23*b), y+(1.10*b), ex-(0.89*b), y+h-(0.76*b), b);
                    }
                    else if(count==2){
                        ctx.moveTo(sx, y);
                        ctx.lineTo(ex, y+h-(0.64*b));                     
                        ctx.stroke();
                        dt_line_shadow_lpww(sx+(0.13*b), y+(0.21*b), ex-(0.59*b), y+h-(1.10*b), b);
                    }
                    else if(count==3){
                        ctx.moveTo(sx+(0.21*b), y);
                        ctx.lineTo(ex, y+h);                     
                        ctx.stroke();
                        dt_line_shadow_lpww(sx+(0.30*b), y, ex+(0.042*b), y+h-(0.76*b), b);
                    }     
                    else if(count==4){                
                        ctx.moveTo(sx, y+(0.21*b));
                        ctx.lineTo(ex, y+h-(0.85*b));                     
                        ctx.stroke();
                        dt_line_shadow_lpww(sx, y+(0.34*b), ex-(0.21*b), y+h-(0.34*b), b);
                    } 
                    else if(count==5){
                        ctx.moveTo(sx, y+(1.48*b));
                        ctx.lineTo(ex, y+h-(0.51*b));                     
                        ctx.stroke();
                        dt_line_shadow_lpww(sx-(0.084*b), y+(1.70*b), ex-(0.25*b), y+h-(0.34*b), b);
                    }  
                }
                function dt_line_shadow_lpww(sh_x, sh_y, sh_lx, sh_ly, b){
                    ctx.beginPath();
                    ctx.lineWidth = (0.084*b);
                    ctx.strokeStyle = darker2;
                    ctx.moveTo(sh_x, sh_y);
                    ctx.lineTo(sh_lx, sh_ly);
                    ctx.stroke();
                } 
            }

            function curve_shadows(x1, y1, bct_x1, bct_y1, bct_x2, bct_y2, end_x, end_y, shade, b){
                ctx.beginPath();
                ctx.lineWidth = (0.084*b);
                ctx.strokeStyle = shade;
                ctx.moveTo(x1, y1);
                ctx.bezierCurveTo(bct_x1, bct_y1, bct_x2, bct_y2, end_x, end_y);
                ctx.stroke();
            }
            function curve_shadows_sp(x1, y1, x2, y2, x3, shades, c){
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = shades;
                ctx.moveTo(x1, y1);
                ctx.quadraticCurveTo(x2, y2, x3, y2);
                ctx.stroke();
            }
            function curve_shadows_sps(){

            }
            


            function glass_frame_sPCathedral(frame_x, frame_y, w, h, count, b){
                frame_x = frame_x+(0.75*b)
                frame_y = frame_y+h-(0.8*b)

                ctx.beginPath();
                ctx.lineWidth = (0.15*b);
                ctx.strokeStyle = darker1;
                ctx.moveTo(frame_x, frame_y);
                ctx.lineTo(frame_x, frame_y-(1.48*b));
                ctx.lineTo(frame_x+(0.42*b), frame_y-(1.48*b));
                ctx.quadraticCurveTo(frame_x+(0.34*b), frame_y-(2.12*b), frame_x+(0.89*b), frame_y-(2.12*b));
                ctx.bezierCurveTo(frame_x+(1.70*b), frame_y-(3.60*b), frame_x+w-(3.39*b), frame_y-(3.60*b), frame_x+w-(2.33*b), frame_y-(2.12*b));
                ctx.quadraticCurveTo(frame_x+w-(1.82*b), frame_y-(2.12*b), frame_x+w-(1.91*b), frame_y-(1.48*b));
                // ctx.lineTo(frame_x+w-45, frame_y-40);
                ctx.lineTo(frame_x+w-(1.91*b), frame_y-(1.48*b));
                ctx.lineTo(frame_x+w-(1.48*b), frame_y-(1.48*b));
                ctx.lineTo(frame_x+w-(1.48*b), frame_y);
                ctx.lineTo(frame_x, frame_y);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                    ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                    ctx.fillRect(frame_x, frame_y-(4.24*b), window_w, window_h);
                    ctx.fill();

                ctx.restore();
            }


            function glass_frame_lPCathedral(frame_x, frame_y, w, h, count, b){
                frame_x = frame_x+(0.75*b)
                frame_y = frame_y+h-(0.6*b)

                ctx.beginPath();
                ctx.lineWidth = (0.1*b);
                ctx.strokeStyle = darker1;
                ctx.moveTo(frame_x, frame_y);
                ctx.lineTo(frame_x, frame_y-(0.84*b));
                ctx.lineTo(frame_x+(0.42*b), frame_y-(0.84*b));
                ctx.quadraticCurveTo(frame_x+(0.508*b), frame_y-(1.70*b), frame_x+(1.27*b), frame_y-(1.70*b));
                ctx.bezierCurveTo(frame_x+(4.24*b), frame_y-(3.81*b), frame_x+w-(5.93*b), frame_y-(3.81*b), frame_x+w-(2.75*b), frame_y-(1.70*b));
                ctx.quadraticCurveTo(frame_x+w-(1.908*b), frame_y-(1.70*b), frame_x+w-(1.908*b), frame_y-(0.85*b));
                // ctx.lineTo(frame_x+w-45, frame_y-40);
                ctx.lineTo(frame_x+w-(1.908*b), frame_y-(0.85*b));
                ctx.lineTo(frame_x+w-(1.48*b), frame_y-(0.85*b));
                ctx.lineTo(frame_x+w-(1.48*b), frame_y);
                ctx.lineTo(frame_x, frame_y);
                ctx.stroke();

                ctx.save();
                ctx.clip();

                    ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                    ctx.fillRect(frame_x, frame_y-(4.24*b), window_w, window_h);
                    ctx.fill();

                ctx.restore();
            }
                

            function glass_frame_SPCasd(frame_x, frame_y, bc_x1, bc_y1, bc_x2, bc_y2, end_x, end_y, count){
                if(selectedWindow == 'lpml'){
                    ctx.beginPath();
                    ctx.lineWidth = (0.1*b_edge);
                    ctx.strokeStyle = lighter1;
                    if(count%2){
                        ctx.moveTo(frame_x, frame_y);
                        ctx.lineTo(frame_x, end_y-(1.19*b_edge));
                        // ctx.bezierCurveTo(bc_x1, bc_y1, bc_x2, bc_y2, end_x, end_y);
                        ctx.quadraticCurveTo(frame_x+(6.36*b_edge), end_y-(1.10*b_edge), end_x+2, end_y);
                        ctx.lineTo(end_x+2, frame_y);
                        ctx.lineTo(frame_x, frame_y);
                    }
                    else{
                        ctx.moveTo(frame_x, frame_y);
                        ctx.lineTo(frame_x, end_y);
                        // ctx.bezierCurveTo(bc_x1, bc_y1, bc_x2, bc_y2, end_x, end_y);
                        ctx.quadraticCurveTo(frame_x+(6.36*b_edge), end_y-(1.10*b_edge), end_x+2, end_y-(1.19*b_edge));
                        ctx.lineTo(end_x+2, frame_y);
                        ctx.lineTo(frame_x, frame_y);
                    }
                    ctx.stroke();
                }
                else if(selectedWindow == 'arch_thm'){
                    ctx.beginPath();
                    ctx.lineWidth = (0.1*b_edge);
                    ctx.strokeStyle = lighter1;
                    if(count%2){
                        ctx.moveTo(frame_x, frame_y);
                        ctx.lineTo(frame_x, end_y-(1.19*b_edge));
                        // ctx.bezierCurveTo(bc_x1, bc_y1, bc_x2, bc_y2, end_x, end_y);
                        ctx.quadraticCurveTo(frame_x+(6.36*b_edge), end_y-(1.10*b_edge), end_x+2, end_y);
                        ctx.lineTo(end_x+2, frame_y);
                        ctx.lineTo(frame_x, frame_y);
                    }
                    else{
                        ctx.moveTo(frame_x, frame_y);
                        ctx.lineTo(frame_x, end_y);
                        // ctx.bezierCurveTo(bc_x1, bc_y1, bc_x2, bc_y2, end_x, end_y);
                        ctx.quadraticCurveTo(frame_x+(6.36*b_edge), end_y-(1.10*b_edge), end_x+2, end_y-(1.19*b_edge));
                        ctx.lineTo(end_x+2, frame_y);
                        ctx.lineTo(frame_x, frame_y);
                    }
                    ctx.stroke();
                }
                else{
                    ctx.beginPath();
                    ctx.lineWidth = (0.1*b_edge);
                    ctx.strokeStyle = lighter1;
                    ctx.moveTo(frame_x, frame_y);
                    ctx.lineTo(frame_x, end_y);
                    ctx.bezierCurveTo(bc_x1, bc_y1, bc_x2, bc_y2, end_x, end_y);
                    ctx.lineTo(end_x, frame_y);
                    ctx.lineTo(frame_x, frame_y);
                    ctx.stroke();
                }

                ctx.save();
                ctx.clip();

                    ctx.fillStyle = rad_grad(frame_x, frame_y, window_w, window_h, count);
                    ctx.fillRect(frame_x, end_y, window_w, window_h);
                    ctx.fill();

                    if(selectedWindow == 'sp_cascade'){
                        decraTrim_SPCasd(frame_x, end_y, window_w, window_h);
                    }
                    else if(selectedWindow == 'cascade'){
                        decraTrim_lPCasd(frame_x, end_y, window_w, window_h);
                    }
                    else if(selectedWindow == 'lpml'){
                        decraTrim_lPml(frame_x, end_y, window_w, window_h);
                    }
                    else if(selectedWindow == 'arch_thm'){
                        decraTrim_arched_thame(frame_x, end_y, window_w, window_h);
                    }

                ctx.restore();
            }


            function decraTrim_arched_thame(x, y, w, h){                

                // for(m = x+(2.2*b_edge); m<(x+w); m+=((w/5)-13)){
                    // w/4-(b*0.02)
                for(m = x+(3.29*b_edge); m<(x+w); m+=(3.32*b_edge)){
                    ctx.beginPath();
                    ctx.shadowColor = 'transparent';
                    ctx.strokeStyle = base_color;
                    ctx.lineWidth = (0.45*b_edge);
                    ctx.lineCap = 'round';
                    ctx.moveTo(m, y-(1*b_edge));
                    ctx.lineTo(m, y+h-(0.424*b_edge));
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = darker2;
                    ctx.lineWidth = (0.02*b_edge);
                    ctx.moveTo(m+(0.23*b_edge), y-(1.2*b_edge));
                    ctx.lineTo(m+(0.23*b_edge), y+h-(0.424*b_edge));
                    ctx.stroke();
                }
            }



            function decraTrim_lPml(x, y, w, h){
                for(k=y; k<=(y+h); k+=(1.84*b_edge)){
                    if(k==y){
                        continue;
                    }
                    else{
                        ctx.beginPath();
                        ctx.lineWidth = (0.24*b_edge);
                        ctx.shadowColor = 'transparent';
                        ctx.lineCap = 'round';
                        ctx.strokeStyle = base_color;
                        ctx.moveTo(x, k-(1.3*b_edge));
                        ctx.lineTo(x+w, k-(1.3*b_edge));
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.strokeStyle = 'red';
                        ctx.lineWidth = (0.084*b_edge);
                        ctx.moveTo(x, k+(1.2*b_edge));
                        ctx.lineTo(x+w, k+(1.2*b_edge));
                        ctx.stroke();
                    }
                }

                for(m = x+(2.195*b_edge); m<(x+w); m+=(2.195*b_edge)){
                // for(m = x+(4*b_edge); m<(x+w); m+=(2.195*b_edge)){
                    ctx.beginPath();
                    ctx.shadowColor = 'transparent';
                    ctx.strokeStyle = base_color;
                    ctx.lineWidth = (0.24*b_edge);
                    ctx.lineCap = 'round';
                    ctx.moveTo(m, y-(1*b_edge));
                    ctx.lineTo(m, y+h-(0.424*b_edge));
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = darker2;
                    ctx.lineWidth = (0.084*b_edge);
                    ctx.moveTo(m+(0.084*b_edge), y-(1.2*b_edge));
                    ctx.lineTo(m+(0.084*b_edge), y+h-(0.424*b_edge));
                    ctx.stroke();
                }
            }

            function decraTrim_SPCasd(x, y, w, h){
                for(k=y; k<=(y+h); k+=(1.84*b_edge)){
                    if(k==y){
                        continue;
                    }
                    else{
                        ctx.beginPath();
                        ctx.lineWidth = (0.22*b_edge);
                        ctx.shadowColor = 'transparent';
                        ctx.lineCap = 'round';
                        ctx.strokeStyle = base_color;
                        ctx.moveTo(x, k-(1.15*b_edge));
                        ctx.lineTo(x+w, k-(1.15*b_edge));
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                        ctx.lineWidth = (0.084*b_edge);
                        ctx.moveTo(x, k+(1.3*b_edge));
                        ctx.lineTo(x+w, k+(1.3*b_edge));
                        ctx.stroke();
                    }
                }

                for(m = x+(0.2*b_edge); m<(x+w); m+=w/2-(1.50*b_edge)){
                    ctx.beginPath();
                    ctx.shadowColor = 'transparent';
                    ctx.strokeStyle = base_color;
                    ctx.lineWidth = (0.22*b_edge);
                    ctx.lineCap = 'round';
                    ctx.moveTo(m+(1.596*b_edge), y-(0.93*b_edge));
                    ctx.lineTo(m+(1.596*b_edge), y+h-(0.424*b_edge));
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                    ctx.lineWidth = (0.084*b_edge);
                    ctx.moveTo(m+(1.78*b_edge), y-(0.93*b_edge));
                    ctx.lineTo(m+(1.78*b_edge), y+h-(0.424*b_edge));
                    ctx.stroke();
                }
            }

            function decraTrim_lPCasd(x, y, w, h){
                for(k=y; k<=(y+h); k+=(1.84*b_edge)){
                    if(k==y){
                        continue;
                    }
                    else{
                        ctx.beginPath();
                        ctx.lineWidth = (0.24*b_edge);
                        ctx.shadowColor = 'transparent';
                        ctx.lineCap = 'round';
                        ctx.strokeStyle = base_color;
                        ctx.moveTo(x, k-(1.3*b_edge));
                        ctx.lineTo(x+w, k-(1.3*b_edge));
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.strokeStyle = 'red';
                        ctx.lineWidth = (0.084*b_edge);
                        ctx.moveTo(x, k+(1.2*b_edge));
                        ctx.lineTo(x+w, k+(1.2*b_edge));
                        ctx.stroke();
                    }
                }

                for(m = x+(2.3*b_edge); m<(x+w); m+=((w/4)-(0.9*b_edge))){
                    ctx.beginPath();
                    ctx.shadowColor = 'transparent';
                    ctx.strokeStyle = base_color;
                    ctx.lineWidth = (0.24*b_edge);
                    ctx.lineCap = 'round';
                    ctx.moveTo(m, y-(0.93*b_edge));
                    ctx.lineTo(m, y+h-(0.424*b_edge));
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = darker2;
                    ctx.lineWidth = (0.084*b_edge);
                    ctx.moveTo(m+(0.084*b_edge), y-(0.93*b_edge));
                    ctx.lineTo(m+(0.084*b_edge), y+h-(0.424*b_edge));
                    ctx.stroke();
                }
            }

            // function inner_frame_SPCasd(inner_x, inner_y, frame_width, frame_height){
            function inner_frame_SPCasd(inner_x, inner_y, frame_width, frame_height, b_edge){
                // outer layer for clipping
                ctx.lineWidth = (0.1*b_edge);
                ctx.strokeStyle = base_color;
                ctx.rect(inner_x, inner_y, frame_width, frame_height);
                ctx.stroke();
    
                ctx.save();
                ctx.clip();
    
                w_border_size = b_edge
                // section under clipping
                ctx.lineWidth = (0.1*w_border_size);
                ctx.strokeStyle = 'transparent';
                // ctx.strokeStyle = 'white';
                ctx.strokeRect(inner_x, inner_y, frame_width, frame_height);
    
                //left shadow_light
                dark_shadow_SPDrktnt(inner_x, inner_y, inner_y+frame_height, (0.1*w_border_size), lighter2, 'ls');
                dark_shadow_SPDrktnt(inner_x+(0.1*w_border_size), inner_y+(0.1*w_border_size), inner_y+frame_height-(0.1*w_border_size),(0.1*w_border_size), lighter1, 'ls');
                //left shadow_dark
                //dark_shadow_SPDrktnt(inner_x+(0.1*w_border_size), inner_y+(0.1*w_border_size), inner_y+frame_height-(0.1*w_border_size), (0.1*w_border_size), darker1, 'ls');
                dark_shadow_SPDrktnt(inner_x+(0.2*w_border_size), inner_y+(0.2*w_border_size), inner_y+frame_height-(0.2*w_border_size), (0.1*w_border_size), darker1, 'ls');
    
                //right shadow_light
                dark_shadow_SPDrktnt(inner_x+frame_width-(0.2*w_border_size), inner_y+(0.2*w_border_size), inner_y+frame_height-(0.2*w_border_size), (0.1*w_border_size), lighter1, 'ls');
                //dark_shadow_SPDrktnt(inner_x+frame_width-(0.4*w_border_size), inner_y-(0.3*w_border_size), inner_y+frame_height-(0.3*w_border_size), (0.1*w_border_size), lighter1, 'ls');
                //right shadow_dark
                dark_shadow_SPDrktnt(inner_x+frame_width-(0.1*w_border_size), inner_y+(0.1*w_border_size), inner_y+frame_height-(0.1*w_border_size), (0.1*w_border_size), darker1, 'ls');
                dark_shadow_SPDrktnt(inner_x+frame_width, inner_y, inner_y+frame_height,(0.1*w_border_size), darker2, 'ls');
    
                // top_shadow_dark
                dark_shadow_SPDrktnt(inner_x, inner_y, inner_x+frame_width, (0.1*w_border_size), lighter1, 'ts');
                dark_shadow_SPDrktnt(inner_x+(0.1*w_border_size), inner_y+(0.1*w_border_size), inner_x+frame_width-(0.1*w_border_size), (0.1*w_border_size), lighter2, 'ts');
                // top_shadow_light
                //dark_shadow_SPDrktnt(inner_x+(0.1*w_border_size), inner_y+(0.1*w_border_size), inner_x+frame_width-(0.1*w_border_size), (0.1*w_border_size), darker1, 'ts');
                dark_shadow_SPDrktnt(inner_x+(0.2*w_border_size), inner_y+(0.2*w_border_size), inner_x+frame_width-(0.2*w_border_size), (0.1*w_border_size), darker1, 'ts');
    
                // bottom_shadow_light
                dark_shadow_SPDrktnt(inner_x+(0.2*w_border_size), inner_y+frame_height-(0.2*w_border_size), inner_x+frame_width-(0.2*w_border_size), (0.1*w_border_size), lighter1, 'ts');
                //dark_shadow_SPDrktnt(inner_x+(0.3*w_border_size), inner_y+frame_height-(0.3*w_border_size), inner_x+frame_width-(0.3*w_border_size), (0.1*w_border_size), lighter1, 'ts');
                // bottom_shadow_dark
                dark_shadow_SPDrktnt(inner_x+(0.1*w_border_size), inner_y+frame_height-(0.1*w_border_size), inner_x+frame_width-(0.1*w_border_size), (0.1*w_border_size), darker1, 'ts');
                dark_shadow_SPDrktnt(inner_x, inner_y+frame_height-(0.1*w_border_size), inner_x+frame_width, (0.1*w_border_size), darker1, 'ts');
                
    
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

            // frame_x, margin_y, window_w, window_h, b_edge);
            function window_frame_SPCasd(inner_x, inner_y, frame_width, frame_height, b_edge){
                // outer layer for clipping
                ctx.lineWidth = (0.1*b_edge);
                ctx.strokeStyle = base_color;
                ctx.rect(inner_x, inner_y, frame_width, frame_height);
                ctx.stroke();

                ctx.save();
                ctx.clip();
                w_border_size = b_edge
                // section under clipping
                ctx.lineWidth = (0.67*w_border_size);
                ctx.strokeStyle = 'transparent';
                // ctx.strokeStyle = 'white';
                ctx.strokeRect(inner_x, inner_y, frame_width, frame_height);



               
                //left shadow_light
                dark_shadow_SPCasd(inner_x, inner_y, inner_y+frame_height, (0.084*w_border_size), lighter2, 'ls');
                dark_shadow_SPCasd(inner_x+(0.084*w_border_size), inner_y+(0.084*w_border_size), inner_y+frame_height-(0.084*w_border_size),(0.042*w_border_size), lighter1, 'ls');
                
                //left shadow_dark
                dark_shadow_SPCasd(inner_x+(0.33*w_border_size), inner_y+(0.33*w_border_size), inner_y+frame_height-(0.33*w_border_size), (0.084*w_border_size), darker2, 'ls');
                dark_shadow_SPCasd(inner_x+(0.254*w_border_size), inner_y+(0.254*w_border_size), inner_y+frame_height-(0.254*w_border_size), (0.084*w_border_size), darker1, 'ls');




                //right shadow_light
                dark_shadow_SPCasd(inner_x+frame_width-(0.339*w_border_size), inner_y+(0.339*w_border_size), inner_y+frame_height-(0.297*w_border_size), (0.084*w_border_size), lighter2, 'ls');
                dark_shadow_SPCasd(inner_x+frame_width-(0.254*w_border_size), inner_y+(0.254*w_border_size), inner_y+frame_height-(0.212*w_border_size), (0.042*w_border_size), lighter1, 'ls');
                //right shadow_dark
                dark_shadow_SPCasd(inner_x+frame_width-(0.084*w_border_size), inner_y+(0.084*w_border_size), inner_y+frame_height-(0.084*w_border_size), (0.084*w_border_size), darker1, 'ls');
                dark_shadow_SPCasd(inner_x+frame_width, inner_y, inner_y+frame_height,(0.084*w_border_size), darker2, 'ls');



                // top_shadow_dark
                dark_shadow_SPCasd(inner_x+(0.254*w_border_size), inner_y+(0.254*w_border_size), inner_x+frame_width-(0.254*w_border_size), (0.084*w_border_size), darker1, 'ts');
                dark_shadow_SPCasd(inner_x+(0.339*w_border_size), inner_y+(0.339*w_border_size), inner_x+frame_width-(0.339*w_border_size), (0.084*w_border_size), darker2, 'ts');
                // top_shadow_light
                dark_shadow_SPCasd(inner_x+(0.084*w_border_size), inner_y+(0.084*w_border_size), inner_x+frame_width-(0.084*w_border_size), (0.084*w_border_size), lighter1, 'ts');
                dark_shadow_SPCasd(inner_x, inner_y, inner_x+frame_width, (0.084*w_border_size), lighter1, 'ts');





                // bottom_shadow_light
                dark_shadow_SPCasd(inner_x+(0.339*w_border_size), inner_y+frame_height-(0.339*w_border_size), inner_x+frame_width-(0.339*w_border_size), (0.084*w_border_size), lighter2, 'ts');
                dark_shadow_SPCasd(inner_x+(0.254*w_border_size), inner_y+frame_height-(0.254*w_border_size), inner_x+frame_width-(0.254*w_border_size), (0.084*w_border_size), lighter1, 'ts');
                // bottom_shadow_dark
                dark_shadow_SPCasd(inner_x+(0.084*w_border_size), inner_y+frame_height-(0.169*w_border_size), inner_x+frame_width-(0.084*w_border_size), (0.084*w_border_size), darker1, 'ts');
                dark_shadow_SPCasd(inner_x, inner_y+frame_height-(0.084*w_border_size), inner_x+frame_width, (0.084*w_border_size), darker2, 'ts');
                
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

            
        }
    }
   

    function window_call(p_r_count, panel_count, panel_wdth, panel_spacing, panel_hght, b_edge, window){
        
        win_count2 = p_r_count;
        h_comp = get_section_h_rail_h(h_ft);
        var s_hght = 0
        var r_hght = 0
        var s_height = h_comp['section_height']
        var r_height = h_comp['rail_height']

        for(i=0; i<p_r_count; i++){
            if(s_height.length == 1){
                s_hght = (+s_hght) + (+s_height[0]);
                r_hght = r_height[0]
            }
            else if(s_height.length == 2){
                sec_h = configure_sections(h_ft, s_height,r_height, i, p_r_count);
                s_hght = (s_hght) + (sec_h[0]);
                r_hght = sec_h[1]
            }
        
        
            for(j=0; j<canvas.width; j+=canvas.width){  
                if(win_count2 != (windowRow)){
                    continue;
                }
                else{
                    if(selectedPanel == 'Short'){
                        panel_y = s_hght-(panel_hght+r_hght)

                        if(window == 'sp_clear' || window == 'sp_darkTint' || window == 'sp_frost'){
                            shortPanel_darkTint(i, panel_count, panel_wdth, panel_hght, panel_spacing, panel_y, b_edge);
                        }
                        else if(window == 'sp_stockton' || window == 'sp_prairie' || window == 'sp_waterford'){
                            shortPanel_stockton(i, panel_count, panel_wdth, panel_hght, panel_spacing, panel_y, b_edge);
                        }
                        else if(window == 'sp_cascade' || window == 'sp_cathedral' || window == 'sp_wagonWheel' || window == 'sp_sunray'){
                            shortPanel_cascade(i, panel_count, panel_wdth, panel_hght, panel_spacing, panel_y, b_edge);
                        }
                        else {
                            shortPanel_darkTint(i, panel_count, panel_wdth, panel_hght, panel_spacing, panel_y, b_edge);
                        }
                        
                    }
                    else if(selectedPanel == 'Long'){
                        // console.log('panel -----', selectedPanel)
                        panel_y = s_hght-(panel_hght+r_hght)
                        switch(window){
                            case 'lp_clear':
                                shortPanel_darkTint(i, panel_count, panel_wdth, panel_hght, panel_spacing, panel_y, b_edge);
                                break;
                            case 'stktn':
                                shortPanel_stockton(i, panel_count, panel_wdth, panel_hght, panel_spacing, panel_y, b_edge);
                                // window_frame_stktn(j, i,stamp_area_w, stamp_area_h, count);
                                break;
                            case 'thames':
                                shortPanel_stockton(i, panel_count, panel_wdth, panel_hght, panel_spacing, panel_y, b_edge);
                                break;
                            case 'arch_thm':
                                shortPanel_cascade(i, panel_count, panel_wdth, panel_hght, panel_spacing, panel_y, b_edge);
                                break;
                            case 'prr':
                                shortPanel_stockton(i, panel_count, panel_wdth, panel_hght, panel_spacing, panel_y, b_edge);
                                break;
                            case 'wtrfd':
                                shortPanel_stockton(i, panel_count, panel_wdth, panel_hght, panel_spacing, panel_y, b_edge);
                                break;
                            case 'cascade':
                                shortPanel_cascade(i, panel_count, panel_wdth, panel_hght, panel_spacing, panel_y, b_edge);
                                break;                                
                            case 'ctdl':
                                shortPanel_cascade(i, panel_count, panel_wdth, panel_hght, panel_spacing, panel_y, b_edge);
                                break;
                            case 'lpml':
                                shortPanel_cascade(i, panel_count, panel_wdth, panel_hght, panel_spacing, panel_y, b_edge);
                                break;
                            case 'lpww':
                                shortPanel_cascade(i, panel_count, panel_wdth, panel_hght, panel_spacing, panel_y, b_edge);
                                break;
                            case 'sunray':
                                shortPanel_cascade(i, panel_count, panel_wdth, panel_hght, panel_spacing, panel_y, b_edge);
                                break;
                            default:
                                shortPanel_darkTint(i, panel_count, panel_wdth, panel_hght, panel_spacing, panel_y, b_edge);
                                break;
                        }
                    }
                    // else{
                    //     console.log('wrong panel selected', selectedPanel);
                    //     break;
                    // }
                }  
            }
            win_count2--;           
        }
    }






    //bottom line ----------------------------------------------------------
    function bottom_line(){
        ctx.fillStyle = 'black';
        ctx.fillRect(0, canvas.height-4, canvas.width, 4);
        ctx.fill();
    }
    


    
    var endtime = performance.now();
    console.timeEnd('draw');
}