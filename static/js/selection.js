// ==============================Window panel filter======================================

$(document).ready(function(){
    // console.log(d_style);
    $("#shortPanels").hide();
    $('#longPanels').hide();
    $('#sp_decraglasses').hide();
    $('#lp_decraglasses').hide();
    $('#flush_p').hide();
    $('#flush_panels').attr('disabled', 'disabled');

    
    
    $('#w_row').hide();

    $('#Handles').hide();
    $('#Strap').hide();
    $('#lock').hide();

    $('#window').attr('disabled', 'disabled');
    $('#win_row').attr('disabled', 'disabled');

    

    $('#hardware').attr('disabled', 'disabled');

    $('#flush_panels').change(function(){
        var f_panel_value = $(this).children('option:selected').val();
        var gType_value = $('#glassType').children('option:selected').val();

        if(f_panel_value == ''){
            $('#window').attr('disabled', 'disabled');
            $('#win_row').attr('disabled', 'disabled');
        }
        else{
            if(gType_value == 'closed'){
                $('#window').attr('disabled', 'disabled');
                $('#win_row').attr('disabled', 'disabled');
            }
            if(gType_value != 'closed'){
                $('#window').removeAttr('disabled');
                $('#win_row').removeAttr('disabled');
            }
            
        }

        $('#window').val('');
        $('#win_row').val('');
        
        draw();

        if(f_panel_value == 'Short_p'){
            $("#shortPanels").show();
            $('#sp_decraglasses').show();
            $("#longPanels").hide();
            $('#lp_decraglasses').hide();

            $('#window').val('');
        }
        else if(f_panel_value == 'Long_p'){
            $("#shortPanels").hide();
            $('#sp_decraglasses').hide();
            $('#longPanels').show();
            $('#lp_decraglasses').show();

            $('#window').val('');
        }
        else if(f_panel_value == ''){
            $("#shortPanels").hide();
            $('#longPanels').hide();
        }
    });


    $('#panels').change(function(){
        
        var panel_value = $(this).children('option:selected').val();

        
        $('#window').val('');
        $('#win_row').val('');
        
        draw();
        if(panel_value == 'Flush'){
            $('#flush_p').show();
            $('#flush_panels').removeAttr('disabled');
            var f_panel_value = $(this).children('option:selected').val();
        }
        else{
            $('#flush_p').hide();
            $('#flush_panels').attr('disabled', 'disabled');
        }

        if(panel_value == 'Long' || panel_value == 'Short' || panel_value == 'Flush'){
            $('#hardware').attr('disabled', 'disabled');
        }
        else if(panel_value == 'Bead Board'){
            $('#hardware').removeAttr('disabled');
        }       
        
        
        //----------------------------------Windows selection based on panel
        if(panel_value == 'Short'){
            $("#shortPanels").show();
            $('#sp_decraglasses').show();
            $("#longPanels").hide();
            $('#lp_decraglasses').hide();

            $('#window').val('');

            // $('#win_row').attr('disabled', 'disabled');           
        
        }
        else if((panel_value == 'Recessed')||(panel_value=='Raised')||(panel_value=='Long')||(panel_value=='Bead Board')||(panel_value=='Long Bead Board')){
            $("#shortPanels").hide();
            $('#sp_decraglasses').hide();
            $('#longPanels').show();
            $('#lp_decraglasses').show();

            $('#window').val('');        
        }
        
        else if(panel_value == ''){
            $("#shortPanels").hide();
            $('#longPanels').hide();
        }

        // ---------------------------------------Hardware selecton based on Panel
        if((panel_value == 'Recessed')||(panel_value=='Raised')||(panel_value=='Bead Board')||(panel_value=='Long Bead Board')){
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

    
    

    $('#glassType').change(function(){
        var gType_value = $(this).children('option:selected').val();
        var panel_value = $('#panels').children('option:selected').val();
        var f_panel = $('#flush_panels').children('option:selected').val();
        var w_val = $('#window').children('option:selected').val();

        if(panel_value){
            if(panel_value != 'Flush'){
                if(gType_value == 'closed'){
                    $('#window').attr('disabled', 'disabled');
                    $('#win_row').attr('disabled', 'disabled');
                }
                else{
                    $('#window').removeAttr('disabled');
                    $('#win_row').removeAttr('disabled');
                }
            }
            else{
                if(f_panel){
                    if(gType_value == 'closed'){
                        $('#window').attr('disabled', 'disabled');
                        $('#win_row').attr('disabled', 'disabled');
                    }
                    else{
                        $('#window').removeAttr('disabled');
                        $('#win_row').removeAttr('disabled');
                    }
                }
                else{
                    $('#window').attr('disabled', 'disabled');
                    $('#win_row').attr('disabled', 'disabled');
                }
            }
        }
        else{
            $('#window').attr('disabled', 'disabled');
            $('#win_row').attr('disabled', 'disabled');
        }
       
    })

    $('#window').change(function(){
        var win_value = $(this).children('option:selected').val();

        if(win_value != ''){
        $('#w_row').show();
        }
    })

    
});