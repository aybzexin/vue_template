class HomeLocation{
    constructor(id, allCity, defaultCity,callback){
        this.cityId = id;
        this.allCitys = allCity;
        this.defaultCity = defaultCity;
        this.callback = callback;
        this.getLocation();
        return this;
    }
    getLocation (){
        if (navigator.geolocation){
            window.widget = window.widget || {};
            widget.location = this;
            navigator.geolocation.getCurrentPosition(this.showPosition,this.showError);
            if(!this.defaultCity){
                $("#"+ this.cityId).on("click",function(){
                    this.getLocation( this.cityId, this.allCitys, this.defaultCity);
                })
            }
        }else{
            alert("浏览器不支持地理定位.");
            showError();
        }

    }
    showError(error){
        if( !widget.location.defaultCity){
            $("#"+ widget.location.cityId).html("定位失败").removeClass("wkt");
        }else{
            $("#"+ widget.location.cityId).html(widget.location.defaultCity.name).attr("data-city",widget.location.defaultCity.pinyin);
            util.LocalStorage("select_city",widget.location.defaultCity);
        }

    }

    showPosition(position){
        var latlon = position.coords.latitude+','+position.coords.longitude;
        //baidu
        var async = true;
        var url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location="+latlon+"&output=json&pois=0";
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: url,
            async:async,
            beforeSend: function(){
                $("#"+widget.location.cityId).html('定位中...');
            },
            success: function (json) {
                if(json.status==0){
                    var city = json.result.addressComponent.city;
                    city = city.replace("市","");
                    var cityPinyin =  widget.location.allCitys[city];
                    if(cityPinyin){
                        $("#"+ widget.location.cityId).html(city).attr("data-city",cityPinyin);
                        if(!widget.location.defaultCity){
                            $("#"+ widget.location.cityId).off("click");
                            $("#"+ widget.location.cityId).addClass("select_city_name");
                        }else{
                            if(cityPinyin == widget.location.defaultCity.pinyin){
                                util.LocalStorage("select_city",widget.location.defaultCity);

                            }
                            var selectCity = {
                                name : city,
                                pinyin : widget.location.allCitys[city]
                            }
                            util.LocalStorage("select_city",selectCity);
                            util.LocalStorage("index_city",  selectCity.pinyin);
                            typeof  widget.location.callback ==="function"  &&  widget.location.callback(selectCity.pinyin);
                        }
                    }else{
                        if(!widget.location.defaultCity){
                            $("#"+ widget.location.cityId).html(city).addClass("wkt").attr("data-city");
                        }else{
                            $("#"+ widget.location.cityId).html(widget.location.defaultCity.name);
                            util.LocalStorage("select_city",widget.location.defaultCity);
                        }
                    }

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                widget.location.showError();
            }
        });
    };
}
export default HomeLocation



