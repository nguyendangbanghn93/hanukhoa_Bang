CM = new function () {
    this.cấuHình = {
        body: $("body"),
        thân: $('<div>', { id: '', class: '', text: '' }),
        khoa: "",
        chuỗiCfg: "web.chuyênMụcLớn",
        chuyênMục: "chuyênMụcLớn",
        trangChủ: {
            "7381": { /*/sựkiện*/
                sốBài: 3,
                điềuKiện: { ụ: "7381++" }
            },
            "8926": { /*/thôngBáo*/
                sốBài: 6,
                điềuKiện: { ụ: "8926++" }
            },
            "8925": { /*/sựkiện*/
                sốBài: 2,
                điềuKiện: { ụ: "8925++" }
            },
        },
        list: {
            menuTrên: [],
            menuDưới: [],
            menuChân: [],
            menuChuyênMục: [],
        },
        hỏiĐáp: "id"
    }
    this.cache = function () {//call back và tải cache
        var callback = rf,
            cache = false, //truyền vào true thì sẽ tải cache và reload
            bvCần = [],
            fns = [],
            đếm = 0,
            cmCon,
            _cfg = {},
            chạy;
        Array.from(arguments).map(function (a) {
            if ($.isFunction(a)) {
                callback = a;
            } else if (typeof a === "boolean") {
                cache = a;
            } else if ($.isAssoc(a)) {
                CM.cấuHình = $.gộp(CM.cấuHình, a);
            }
        });
        chạy = function () {
            var fn = fns.pop();
            if ($.isFunction(fn)) {
                fn(chạy);
            } else {
                đếm--;
                if (đếm == 0) {
                    xửLý("bàiViết.tải.1000", { d: { ụ: CM.cấuHình.chuyênMục + "++" } }, function (allBv) {
                        cl("allBv", allBv)
                        TẢI.db("bàiViết." + allBv, function () {
                            mảng(allBv).map(function (i, d) {
                                //Cache dữ liệu bài viết trên trang chủ
                                $.chấm(_cfg, "bàiViết." + i, config("bàiViết." + i));
                            });
                            cl("chưa có cache - tải cache xong", _cfg);
                            cfg(CM.cấuHình.chuỗiCfg, _cfg, function () {
                                callback.call(this, _cfg);
                                chờ(function () {
                                    CM.sitemap(CM.cấuHình.chuyênMục, function () {
                                        cache && location.reload();
                                    });
                                    chờ(false)
                                }, 456)
                            });
                        })
                    })
                }
            }
        };
        chờ(cache);
        cfg(CM.cấuHình.chuỗiCfg, function (a) {
            _cfg = a;
            if (empty(_cfg) || cache) {
                _cfg = {};
                TẢI.db("chuyênMục." + CM.cấuHình.chuyênMục, { bỏQua: false }, function () {
                    cmCon = $.gộp(mảng(CM.cấuHình.chuyênMục), khôngGian.chuyênMục.sau(CM.cấuHình.chuyênMục));
                    TẢI.db(["chuyênMục." + cmCon, "chuyênLực." + cmCon], { bỏQua: false }, function () {
                        mảng(cmCon).map(function (i, d) {
                            //cache tất cả chuyên mục
                            $.chấm(_cfg, "chuyênMục." + i, config("chuyênMục." + i));
                            $.chấm(_cfg, "chuyênLực." + i, config("chuyênLực." + i));
                        });
                        $.map(CM.cấuHình.trangChủ, function (d, i) {
                            fns.push(function (fn) {
                                xửLý("bàiViết.tải." + d.sốBài, { d: d.điềuKiện }, function (bv) {
                                    bvCần = $.gộp([], bvCần, bv);
                                    //cách số lượng bài viết trên trang chủ
                                    $.chấm(_cfg, "trangChủ." + i, mảng(bv));
                                    fn && fn.call(this, _cfg);
                                })
                            })
                        });
                        cl("__fns", fns)
                        đếm = count(fns)
                        chạy();
                        chạy();
                        chạy();
                    })
                })
            } else {
                cl("Đã có cache\n", _cfg);
                config("chuyênMục", _cfg.chuyênMục);
                config("chuyênLực", _cfg.chuyênLực);
                config("bàiViết", _cfg.bàiViết);
                callback.call(this, _cfg);
            }
        })
    }
    this.cậpNhật = function (i, loại) {
        chờ(true);
        var m = ["bàiViết"];
        if (loại == "chuyênMục") {
            m = ["chuyênMục", "chuyênLực"];
        }
        cfg(chuỗiCfg, function (data) {
            TẢI.db(m.map(function (c) {
                return c + "." + i
            }), function () {
                m.map(function (c) {
                    $.chấm(data, c + "." + i, config(c + "." + i));
                })
                cfg(chuỗiCfg, data, function () {
                    chờ(function () {
                        đổiURL("");
                        chờ(false);
                    }, 456)
                });
            })
        })
    };
    this.sitemap = function (chuyênMụcLớn, fn) {
        var str = '';
        str += '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';
        ["bàiViết", "chuyênMục"].map(function (c) {
            $.map(config(c), function (d, i) {
                if (!empty(d)) {
                    str += '<url>';
                    str += '<loc>' + location.origin + dữLiệu.url(i, c) + '</loc>';
                    str += '<lastmod>' + (iDate(d.ậ || now().u).O.toISOString()) + '</lastmod>';//.toISOString()
                    str += '<changefreq>daily</changefreq>';
                    str += '<priority>0.8</priority>';
                    str += '</url>';
                }
            })
        })
        str += '</urlset>';
        $.ajax({
            method: 'POST',
            url: location.origin + "/" + "sitemap.php",
            data: {
                chuyênMục: chuyênMụcLớn,
                sitemap: str
            },
            success: function (a) {
                fn && fn.call(this);
            },
            error: function (jqXHR, textStatus, error) {
                cl(jqXHR, textStatus, error)
                fn && fn.call(this);
            }
        })
    }
    
}
$.fn.extend({
    lấyMàu: function (o) {
        var o = $.gộp({
            sẵn: localStorage.getItem('màu') || "#efd455",
            đổi: rf,
            tip: "",
        }, o);
        return this.each(function () {
            var t = $(this);
            o.tip && t.tip(o.tip);
            t.sửaLớp("bấmĐc").append($("<input>", { type: "color", class: "dn", value: o.sẵn || "" }).on("click", function (e) {
                e.stopPropagation();
                $(this).off("change").on("change", function () {
                    o.đổi && o.đổi.call(t, $(this).iVal());
                })
            }));
            var c = t.find("[type=color]");
            t.on("click", function () {
                c.trigger("click");
            })
        })
    },
    cắtD: function (a, b) {
        return this.each(function () {
            var t = $(this),
                s = t.text(),
                ms = s.split(" "),
                quay = setInterval(function () {
                    var lh = t.css('line-height').replace("px", "") * 1,
                        mh = a * 1 * lh,
                        sc;
                    if (lh) {
                        if (t.height() > mh) {
                            t.empty();
                            $.each(ms, function (i, c, g) {
                                t.append(c + " ");
                                if (t.height() > mh) {
                                    while (t.height() > mh) {
                                        sc = t.text();
                                        sc = sc.slice(0, sc.lastIndexOf(" "));
                                        sc = sc.slice(0, sc.lastIndexOf(" "));
                                        t.empty().append(sc + " ...");
                                    }
                                    range(0, b).map(function () {
                                        sc = sc.slice(0, sc.lastIndexOf(" "));
                                        sc = sc.slice(0, sc.lastIndexOf(" "));
                                        t.empty().append(sc + " ...");
                                    })
                                    return false;
                                }
                            })
                            clearInterval(quay);
                        } else {
                            t.height(mh)
                        }
                    }
                });
        })
    },
    cắtDòng: function (a, b) {
        return this.each(function () {
            var t = $(this),
                s = t.text(),
                ms = s.split(" "),
                quay = setInterval(function () {
                    var lh = t.css('line-height').replace("px", "") * 1,
                        mh = a * 1 * lh,
                        sc;
                    if (lh) {
                        if (t.height() > mh) {
                            t.empty();
                            $.each(ms, function (i, c, g) {
                                t.append(c + " ");
                                if (t.height() > mh) {
                                    while (t.height() > mh) {
                                        sc = t.text();
                                        sc = sc.slice(0, sc.lastIndexOf(" "));
                                        sc = sc.slice(0, sc.lastIndexOf(" "));
                                        t.empty().append(sc + " ...");
                                    }
                                    // range(0, b).map(function () {
                                    //     sc = sc.slice(0, sc.lastIndexOf(" "));
                                    //     sc = sc.slice(0, sc.lastIndexOf(" "));
                                    //     cl(sc)
                                    //     t.empty().append(sc + " ...");
                                    // })
                                    return false;
                                }
                            })
                            clearInterval(quay);
                        }
                    }
                });
        })
    },
    classB: function (o) {
        $(this).attr({ "classb": Je(o) });
        chờ(function () {
            $(window).trigger("resize");
        }, 123, "classB")
    },
    classXl: function (a, b) {
        var _a = a.split(",").map(function (chữ) { return chữ.search("-") == 0 ? chữ.replace("-", "") : ("-" + chữ); }).join(","),
            c = $(window).width() > 1199;
        c = b ? !c : c;
        $(this).sửaLớp(c ? a : _a);
    },
    classLg: function (a, b) {
        var _a = a.split(",").map(function (chữ) { return chữ.search("-") == 0 ? chữ.replace("-", "") : ("-" + chữ); }).join(","),
            c = $(window).width() < 1200;
        c = b ? !c : c;
        $(this).sửaLớp(c ? a : _a);
    },
    classMd: function (a, b) {
        var _a = a.split(",").map(function (chữ) { return chữ.search("-") == 0 ? chữ.replace("-", "") : ("-" + chữ); }).join(","),
            c = $(window).width() < 992;
        c = b ? !c : c;
        $(this).sửaLớp(c ? a : _a);
    },
    classSm: function (a, b) {
        var _a = a.split(",").map(function (chữ) { return chữ.search("-") == 0 ? chữ.replace("-", "") : ("-" + chữ); }).join(","),
            c = $(window).width() < 768;
        c = b ? !c : c;
        $(this).sửaLớp(c ? a : _a);
    },
    classXs: function (a, b) {
        var _a = a.split(",").map(function (chữ) { return chữ.search("-") == 0 ? chữ.replace("-", "") : ("-" + chữ); }).join(","),
            c = $(window).width() < 480;
        c = b ? !c : c;
        $(this).sửaLớp(c ? a : _a);
    },
});
var màn = function (a, b) {
    var w = $(window).width();
    if (b) {

    } else {
        switch (a) {
            case "xl":
                return w > 1199;
            case "lg":
                return w < 1200;
            case "md":
                return w < 992;
            case "sm":
                return w < 768;
            case "xs":
                return w < 479;
        }
    }
};
Trang = new function () {
    this.library = function () {
        return $('<div>', { id: '', class: 'library', text: '' }).append(
            '<div id="fb-root"></div> <script async defer crossorigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v10.0&appId=525943765452875&autoLogAppEvents=1" nonce="sXSbW4Uo"></script>'
        )
    }
    this.header = function () {
        return $('<div>', { id: '', class: 'bg1 dn-xs', text: '' }).append(
            $('<div>', { id: '', class: 'container', text: '' }).append(
                $('<div>', { id: '', class: 'df jcsb plr10', text: '' }).append(
                    $('<a>', { href: '/', id: '', class: 'df aic', text: '' }).append(
                        $('<div>', { id: '', class: 'bgcf pa10', icon: "home::cl1,fs14", text: '' }).on('taphold', function name() {
                            CM.cache(true);
                        }),
                        $('<div>', { id: '', class: 'cf fs12 fwb ml5', text: 'Trường Đại học Hà Nội' }),
                    ),
                    $('<div>', { id: '', class: 'df aic', text: '' }).append(
                        $('<div>', { id: '', class: 'df aic mr15', text: '' }).append(
                            $('<input>', { id: '', class: 'bra25 on plr10', text: '', placeholder: 'Tìm kiếm' }).iInput({
                                nhãn: true,
                                bo: "bra25,-bra3",
                            }).width(280).chờ(function () {
                                var t = $(this);
                                t.closest(".bọc").find(".kèm").sửaLớp("-phv,-o0").icon("search::fs12,cl1,fwb,nútTìm")
                                t.closest(".bọc").find(".nútTìm").off()
                            }, 12).chờKhóa("keyup", function (e) {
                                Trang.tìmKiếm({
                                    khung: $(this).closest(".bọc"),
                                    từKhóa: e.target.value,
                                    sốBài: 20,
                                    iMsg: {},
                                })
                            }, 500, "tìmKiếm"),
                        ),
                        $('<a>', { href: 'https://hanu.connections.vn/', id: '', class: 'cf ttu fwb bấmĐc', icon: "person::fs12", text: 'Đăng nhập' }),
                    ),
                ),
            ),
        );
    }
    this.chuyênMục = function (cm, bvTruyềnVào) {
        var cms = khôngGian.chuyênMục.trước(cm),
            cmc;
        cms = cms.slice(iA(CM.cấuHình.chuyênMục, cms));
        cmc = config("chuyênLực." + cms[0]) || [];
        CM.cấuHình.thân.find(".bb2cl1h.menu").sửaLớp("-bb2cl1")
        return $('<div>', { id: '', class: 'container', text: '' }).css("minHeight", "800px").append(
            $('<div>', { id: '', class: 'grid ptb25 mb25 pr plr10', text: '' }).append(
                $('<a>', { href: "/", class: 'ttu fs11 cl1h fwb', icon: 'keyboard_arrow_right::fs12,fr,mlr5', text: "Trang chủ" }),
                cms.map(function (i) {
                    return $('<a>', { href: dữLiệu.url(i, "ụ"), class: 'ttu fs11 cl1h fwb', icon: 'keyboard_arrow_right::fs12,fr,mlr5', text: dữLiệu.tên(i, "ụ") }).nếu(i == cm, function () {
                        $(this).sửaLớp("cl1")
                    })
                }),
                $.icon("sync::fs12,fwb,bấmĐc,cb1,shineh").tip("Bấm để cập nhật chuyên mục").click(function () {
                    CM.cậpNhật(cm, "chuyênMục");
                }),
                $('<div>', { id: '', class: 'pa b0 l0 bg1', text: '' }).css({
                    height: "2px",
                    width: "100px",
                }),
            ),
            $('<div>', { id: '', class: 'grid', text: '' }).append(
                $('<div>', { id: '', class: 'col-sm-0 col-md-4 bsbb pr50', text: '' }).css({ minHeight: "" }).append(
                    $('<div>', { id: '', class: 'pb50', text: '' }).append(
                        $('<a>', { href: dữLiệu.url(cms[0], "ụ"), id: '', class: 'fs15 fs11-xs cl1 ttu fwb mb25 db', text: dữLiệu.tên(cms[0], "ụ") }),
                        cmc.map(function (i) {
                            var c = config("chuyênLực." + i),
                                div = $('<div>', { id: i, class: 'ptb10 bb1 bss bcd chứaChuyênMục', text: '' }).append(
                                    $('<div>', { id: '', class: 'df jcsb', text: '' }).append(
                                        $('<a>', { href: dữLiệu.url(i, "ụ"), class: 'fwb cl1h w80 ' + (i == cm ? 'cl1' : ''), text: dữLiệu.tên(i, "ụ") }),
                                        empty(c) ? "" : $('<div>', { class: 'nútMởCon', icon: 'keyboard_arrow_down::fs12,bấmĐc,cl1h', text: '' })
                                    )
                                ),
                                tạoCon = function () {
                                    var t = $(this),
                                        i = t.ID(),
                                        c = config("chuyênLực." + i);
                                    t.append(
                                        mảng(c).map(function (i, j) {
                                            var _c = config("chuyênLực." + i);
                                            return $('<div>', { id: i, class: 'pt10 pl10 chứaChuyênMục ' + (j != mảng(c).length - 1 ? "bb1 bss bcd" : ""), text: '' }).append(
                                                $('<div>', { id: '', class: 'df jcsb', text: '' }).append(
                                                    $('<a>', { href: dữLiệu.url(i, "ụ"), class: 'cl1h w80 ' + (i == cm ? 'cl1' : ''), text: dữLiệu.tên(i, "ụ") }),
                                                    empty(_c) ? "" : $('<div>', { class: 'nútMởCon', icon: 'keyboard_arrow_down::fs12,bấmĐc,cl1h', text: '' })
                                                )
                                            ).nếu(!empty(_c), tạoCon).hide();
                                        })
                                    )
                                };
                            return div.nếu(!empty(c), tạoCon).on("click", ".nútMởCon", function () {
                                var t = $(this);
                                if (t.text() == "keyboard_arrow_down") {
                                    t.icon("keyboard_arrow_up").closest(".chứaChuyênMục").children(".chứaChuyênMục").slideDown().end().siblings(".chứaChuyênMục").find(".nútMởCon").each(function () {
                                        var t = $(this);
                                        if (t.text() == "keyboard_arrow_up") {
                                            t.trigger("click");
                                        }
                                    })
                                } else {
                                    t.icon("keyboard_arrow_down").closest(".chứaChuyênMục").find(".chứaChuyênMục").slideUp().end().find(".nútMởCon").icon("keyboard_arrow_down");
                                }
                            });
                        })
                    ).chờ(function () {
                        var t = $(this);
                        khôngGian.chuyênMục.trước(cm).map(function (i) {
                            i != cm && t.find(".chứaChuyênMục#" + i).children(".df.jcsb").children(".nútMởCon").trigger("click");
                        })
                    }, 123),
                    $('<div>', { id: '', class: 'pb50', text: '' }).append(
                        $.map(CM.cấuHình.list.menuChuyênMục, function (d) {
                            return $('<div>', { id: '', class: 'ptb15', text: '' }).append(
                                $('<a>', { href: dữLiệu.url(d.chuyênMục, "ụ"), id: '', class: 'db bg1o1 bóng pa15 fs15 cl1', icon: d.icon + "::fs12", text: dữLiệu.tên(d.chuyênMục, "ụ"), tip: dữLiệu.tên(d.chuyênMục, "ụ") }),
                            );
                        }
                        )
                    ),
                ),
                $('<div>', { id: '', class: 'col-sm-12 col-md-8 hmn5 oh', text: '' }).each(function () {
                    var T = $(this);
                    if (cm == 7369) {
                        T.append(Trang.hỏiĐáp(cm));
                    } else if (!empty(bvTruyềnVào)) {
                        T.append(
                            Trang.loạiBàiViết(bvTruyềnVào),
                            Trang.tinLiênQuan(cm, bvTruyềnVào))
                    } else {
                        T.append(
                            $('<div>', { id: '', class: '', text: '' }).xửLý("bàiViết.tải.1000", { d: { ụ: cm } }, { cache: true, chờ: true }, function (bvs) {
                                var t = $(this);
                                bvs = mảng(bvs);
                                if (empty(bvs)) {
                                    t.append(
                                        $('<div>', { id: '', class: 'pb25 tac pa10 tac', icon: 'search_off::fs15,mr3', text: 'Hiện chuyên mục này chưa có thông tin/bài viết.' })
                                    )
                                } else if (count(bvs) == 1) {
                                    CẦN.db("bàiViết." + bvs, function () {
                                        đổiURL(dữLiệu.url(bvs + "", "ế"));
                                    })
                                } else {
                                    t.append(
                                        $('<div>', { id: '', class: 'chứaBàiViếtChuyênMục_' + cm, text: '' }),
                                        $('<div>', { id: '', class: 'phânTrangChuyênMục_' + cm, text: '' }),
                                    )
                                    CẦN.db("bàiViết." + bvs, function () {
                                        sửLý.phânTrang({
                                            dòng: bvs,
                                            idTable: md5TuyểnDụng,
                                            trangSố: $.toParam().page,
                                            elm: CM.cấuHình.thân.find('.phânTrangChuyênMục_' + cm),
                                            sốDòng: 5,
                                            // link: true,
                                            đổiURL: true,
                                            dạngHiểnThị: function (s, t, ố) {
                                                CẦN.db("bàiViết." + s, function () {
                                                    CM.cấuHình.thân.find('.chứaBàiViếtChuyênMục_' + cm).empty().append(
                                                        giaoDiện.danhSách({
                                                            bàiViết: s,
                                                            sốBài: 5,
                                                            cắtTiêuĐề: màn("xs") ? 1 : 2,
                                                            cắtDòng: màn("xs") ? 2 : 3,
                                                        }),

                                                    )
                                                })
                                            }
                                        })
                                        T.append(Trang.tinLiênQuan(cm, bvs));
                                    })
                                }
                            }),

                        )
                    }
                }),
            ),
        )
    }
    this.bàiViết = function (bv) {
        var d = config("bàiViết." + bv),
            cm = mảng($.trùng(khôngGian.chuyênMục.sau(CM.cấuHình.chuyênMục), Jd(d.ụ), true))[0];
        return Trang.chuyênMục(cm, bv);
    }
    this.footer = function (obj) {
        obj = $.gộp({
            tênTrường: "Trường Đại học Hà Nội - Hanoi University",
            địaChỉ: 'Địa chỉ: Phòng 506, nhà C, Trường Đại học Hà Nội, Km9, Nguyễn Trãi, quận Nam Từ Liêm, Hà Nội, Việt Nam',
            điệnThoại: "Điện thoại: 024 3554 1794",
            email: 'Email: taybannha@hanu.edu.vn',
            facebook: "https://facebook.com",
            linkEmail: "https://gmail.com",
        }, obj)
        return $('<div>', { id: '', class: 'bg1 ptb25', text: '' }).append(
            $('<div>', { id: '', class: 'container', text: '' }).append(
                $('<div>', { id: '', class: 'df fww jcsb pa10', text: '' }).append(
                    $('<div>', { id: '', class: ' col-xs-12 col-md-8 df aic lh15', text: '' }).append(
                        $('<a>', { href: '/', id: '', class: 'db dfn wh100 bgrn bgpc bgso dn-xs mr10', text: '' }).ảnh(ud, "ụ", true),
                        $('<div>', { id: '', class: 'cf', text: '' }).append(
                            $('<div>', { id: '', class: '', text: obj.tênTrường }),
                            $('<div>', { id: '', class: 'fs12 fwb ttu', text: CM.cấuHình.khoa }),
                            $('<div>', { id: '', class: '', text: obj.địaChỉ }),
                            $('<div>', { id: '', class: '', text: obj.điệnThoại }),
                            $('<div>', { id: '', class: '', text: obj.email }),
                        ),
                    ),
                    $('<div>', { id: '', class: ' col-xs-12 col-md-4 df fww cf', text: '' }).append(
                        CM.cấuHình.list.menuChân.map(function (i) {
                            return $('<a>', { href: dữLiệu.url(i, "ụ"), id: '', class: 'pa10 w50 plr15 ttu fwb bấmĐc tduh', text: dữLiệu.tên(i, "ụ") }).append(
                                i != 8993 ? "" : $('<c>', { id: '', class: '', text: '' }).append(
                                    $('<a>', { href: obj.facebook, id: '', class: '', icon: 'facebook::fs12,bấmĐc,mlr5,cf', text: '' }),
                                    $('<a>', { href: obj.linkEmail, id: '', class: '', icon: 'email::fs12,bấmĐc,mlr5,cf', text: '' }),
                                ),
                            );
                        })
                    ),
                ),
            ),
        );
    }
    this.loạiBàiViết = function (i) {
        var d = config("bàiViết." + i) || {},
            div = $('<div>', { id: 'bàiViết', class: 'pb50 plr10 lh1    8', text: '' }).data("bàiViết", i),
            _d = (d.ộ || "").toJSON() || {};
        div.append(
            $('<div>', { id: '', class: 'bb1 bss bcd pb10 mb25', text: '' }).append(
                $('<div>', { id: '', class: 'fs15 fs11-xs mb5 df fwb jcsb aic lh12', text: dữLiệu.tên(i, "ế") }),
                $('<div>', { id: '', class: 'jcsb df aic', text: '' }).append(
                    $('<div>', { id: '', class: 'df ', text: '' }).append(
                        $('<div>', { id: '', class: 'cl1h pa5 bấmĐc', icon: "print::fs15", text: 'In bài viết' }).click(function () {
                            div.find("#nộiDung").in();
                        }),
                        $('<div>', { id: '', class: 'cl1h pa5 bấmĐc', icon: "sync::fs15", text: 'Làm mới' }).click(function () {
                            CM.cậpNhật(i)
                        }),
                    ),
                    $('<div>', { id: '', class: 'c6 mb5 fs09', icon: 'insert_invitation::fs12', text: iDate(d.ậ || d.ấ, "{j}/{n}/{f} - {h}:{m}") })
                ),

            ),
        )
        switch (_d.type) {
            case "tuyểnDụng":
                div.append(
                    $('<div>', { id: '', class: '', text: '' }).append(
                        $('<div>', { id: '', class: 'c6 mb5', text: _d.ô }),
                        $('<div>', { id: '', class: 'grid', text: '' }).append(
                            $('<div>', { id: '', class: 'cgd mr10', text: '' }).append(
                                $('<div>', { id: '', class: 'pl10fs08', icon: 'insert_invitation::fs12', text: 'Ngày nhận đơn' }),
                                $('<div>', { id: '', class: 'bra5 bóng pa5 ', text: iDate(d.ậ || d.ấ, "{j}/{n}/{y} - {h}:{m}") })
                            ),
                            $('<div>', { id: '', class: 'crd mr10', text: '' }).append(
                                $('<div>', { id: '', class: 'pl10 fs08', icon: 'insert_invitation::fs12', text: 'Ngày kết thúc' }),
                                $('<div>', { id: '', class: 'bra5 bóng pa5 ', text: iDate(d.ậ || d.ấ, "{j}/{n}/{y} - {h}:{m}") })
                            ),
                            $('<div>', { id: '', class: 'cb1 mr10', text: '' }).append(
                                $('<div>', { id: '', class: 'pl10 fs08', icon: 'location_on::fs12', text: 'Địa điểm' }),
                                $('<div>', { id: '', class: 'bra5 bóng pa5 ', text: có("ị.formatted_address", _d) })
                            ),
                        ),
                    ),
                    $('<div>', { id: '', class: 'bgps bgsc bgrn pb169 mtb15', text: '' }).ảnh(_d.ả, "i", true),
                    $('<div>', { id: 'nộiDung', class: 'oh lh15', text: '' }).html(_d.ộ),
                );
                break;
            default:
                div.append(
                    $('<div>', { id: 'nộiDung', class: 'oh lh15' }).append(
                        d.ộ
                    ),
                );
                break;
        }
        div.append(
            $('<div>', { id: '', class: 'mt15', text: '' }).html('<div class = "fb-like" data-href = "' + location.href + '" data-width = "" data-layout = "button_count" data-action = "like" data-size = "large" data-share = "true" > </div> '),
        )
        return div.chờ(function () {
            if (typeof FB == "object")
                FB.XFBML.parse();
            $(this).trigger("hiểnThị")
        }, 123);
    }
    this.tinLiênQuan = function (ụ, bvs) {
        var div = $('<div>', { id: '', class: 'pb50 dn', text: '' }).append(
            $('<div>', { id: '', class: 'ttu fs11 cl1h fwb cl1 mb15 plr10', icon: "article::fs12,", text: 'Tin liên Quan' }),
            $('<div>', { id: '', class: '', text: '' }).each(function () {
                var t = $(this),
                    render = function (bvs) {
                        bvs = mảng(bvs);
                        !empty(bvs) && chờ(function () {
                            div.sửaLớp("-dn");
                        }, 123)
                        t.append(
                            giaoDiện.ngang({
                                bàiViết: bvs,
                                sốBài: 3,
                                cắtTiêuĐề: màn("xs") ? 1 : 2,
                                cắtDòng: màn("xs") ? 1 : 2,
                            }),
                        )
                    };
                if ($.isArray(bvs)) {
                    render(bvs)
                } else {
                    cl("Chuyên mục", ụ)
                    xửLý("bàiViết.tải.6", { d: { ụ: ụ } }, { cache: true }, function (a) {
                        a = $.trùng(mảng(a), mảng(bvs), false);
                        if (!empty(a)) {
                            render(a)
                        }
                    })
                }
            })
        );
        return div;
    }
    this.hỏiĐáp = function (i) {
        var n;
        return $('<div>', { id: '', class: 'h1', text: '' }).append(
            $('<div>', { id: '', class: 'fs15 fs11-xs cl1 ttu fwb pt25 pb25 db tac bgcfx mb25', text: "Liên hệ hỗ trợ" }),
            n = $('<div>', { id: '', class: 'df fww', text: '' }).append(
                [
                    {
                        i: "ê",
                        ê: "Tiêu đề",
                        icon: "article",
                        chứa: "col-xs-12 pa10",
                        hợpLệ: "",
                        bắtBuộc: true,
                    },
                    {
                        i: "ề",
                        ê: "Họ và tên",
                        icon: "account_circle",
                        chứa: "col-xs-12 col-md-6 pa10",
                        hợpLệ: "tên",
                        bắtBuộc: true,
                    },
                    {
                        i: "b",
                        ê: "Mã sinh viên",
                        icon: "today",
                        chứa: "col-xs-12 col-md-6 pa10",
                        hợpLệ: "bd",
                    },
                    {
                        i: "ố",
                        ê: "Số điện thoại",
                        icon: "contact_phone",
                        chứa: "col-xs-12 col-md-6 pa10",
                        hợpLệ: "đt",
                    },
                    {
                        i: "e",
                        ê: "Email",
                        icon: "contact_phone",
                        chứa: "col-xs-12 col-md-6 pa10",
                        hợpLệ: "em",
                    },
                ].map(function (d) {
                    return $('<div>', { id: '', class: d.chứa + " pr", text: '' }).append(
                        d.bắtBuộc ? $('<div>', { id: '', class: 'pa t0 r0 fs18 fwb crd', text: '*' }).tip("Bắt buộc nhập nội dung") : "",
                        $('<input>', { id: d.i, placeholder: d.ê, hợpLệ: d.hợpLệ, class: 'bra5 pl25 lấyĐc', text: '' }).iInput({
                            icon: d.icon + "::fs12,cl1,h1,aic,df,jcsc,bgce,ml0",
                            nhãn: true,
                            bo: "bra5,bóng,bn"
                        }).chờ(function () {
                            $(this).sửaLớp("-bsi")
                        }, 1),
                    )
                }),
                $('<div>', { id: '', class: 'col-xs-12 pa10 pr', text: '' }).append(
                    $('<div>', { id: '', class: 'pa t0 r0 fs18 fwb crd', text: '*' }).tip("Bắt buộc nhập nội dung"),
                    $('<div>', { id: 'ộ', class: ' bgcf bra5 bóng lấyĐc', text: '', placeholder: 'Nhập nội dung' }).soạnThảo({
                        cỡ: 16,
                        nhãn: "Nhập nội dung",
                        bo: "pa15"
                    }),
                ),
            ),
            $('<div>', { id: '', class: 'tac grid', text: '' }).append(
                $('<div>', { id: '', class: 'pa15 bra5 cf bg1 fwb mtb25 bấmĐc', text: 'Gửi câu hỏi' }).click(function () {
                    var d = n.toParam(),
                        ộ = "";
                    if (n.find('đỏ').length) {
                        thôngBáo.lưuÝ("Vui lòng nhập đúng định dạng");
                    } else if (!d.ê || !d.ề || !d.ộ) {
                        thôngBáo.lưuÝ("Vui lòng điền đẩy đủ thông tin bắt buộc");
                    } else {
                        ộ += "<table>";
                        ộ += "<tr><td class='pa5'>Người đặt câu hỏi:</td><td class='pa5 fwb'>" + d.ề + "</td></tr>";
                        ộ += "<tr><td class='pa5'>Mã sinh viên:</td><td class='pa5 fwb'>" + d.b + "</td></tr>";
                        ộ += "<tr><td class='pa5'>Số điện thoại:</td><td class='pa5 fwb'>" + d.ố + "</td></tr>";
                        ộ += "<tr><td class='pa5'>Email:</td><td class='pa5 fwb'>" + d.e + "</td></tr>";
                        ộ += "</table>";
                        ộ += "<div class='pa5 mb5'>Nội dung:</div>";
                        ộ += d.ộ;
                        xửLý("bàiViết.đăng", {
                            d: {
                                ộ: ộ,
                                ê: d.ê,
                                h: 0,
                                p: 0,
                                ở: d.ề,
                                ụ: [String(i)],
                                à: dữLiệu.quanHệ("-sởHữu.tàiKhoản", config("chuyênMục." + chuyênMụcLớn)) || ""
                            }
                        }, function (id) {
                            if (id > 0) {
                                thôngBáo.xácNhận({
                                    tiêuĐề: "Thông báo",
                                    môTả: "Câu hỏi của bạn đã được gửi thành công",
                                });
                                đổiURL("")
                            } else {
                                thôngBáo.Lỗi("Chất lượng đường truyền không ổn định vui lòng thử lại sau")
                            }
                        })
                    }
                }),
            ),
        )
    }
    this.tìmKiếm = function (o) {
        var o = $.gộp({
            khung: $(),
            từKhóa: "",
            sốBài: 20
        }, o);
        count(o.từKhóa) >= 2 && lấyChuyênLực([CM.cấuHình.chuyênMục], function (ụ) {
            o.khung.xửLý("đốiTượng.tải.bàiViết", {
                d: {
                    từKhóa: [o.từKhóa, ["ê", "ô", "ộ"]],
                    thuộcTính: {
                        ụ: $.gộp(ụ, ["~|"])
                    },
                    giớiHạn: 20
                }
            }, function (a) {
                var div = $('<div>', { id: '', class: 'cb oya', text: '' }).css({ maxWidth: "500px", maxHeight: "400px" });
                cl("Vào tìm kiếm", {
                    từKhóa: [o.từKhóa, ["ê", "ô", "ộ"]],
                    d: {
                        thuộcTính: {
                            ụ: $.gộp(ụ, ["~|"])
                        }
                    },
                    giớiHạn: 20
                }, a);
                if (empty(a)) {
                    div.append(
                        $('<div>', { id: '', class: 'pa25 tac', icon: 'search_off::fs15', text: 'Không tồn tại kết quả tìm kiếm' }))
                } else {
                    div.cần("bàiViết." + a, function () {
                        $(this).append(
                            mảng(a).map(function (i, d) {
                                d = config("bàiViết." + i) || {};
                                return $("<a>", { href: dữLiệu.url(i, "ế"), class: "col-xs-12 cl1h c1", title: dữLiệu.tên(i, "ế") }).append(
                                    $("<div>", { class: "pa15 df jcsb" }).append(
                                        $("<div>", { class: "col-xs-4" }).append(
                                            $("<div>", { class: "pb169 bgsc bgrn bgpc" }).ảnh(i, "ế", true)
                                        ),
                                        $("<div>", { class: "col-xs-8 bsbb pl15 pr" }).append(
                                            $("<div>", { class: "fs09 fwb wbox tal", text: dữLiệu.tên(i, "ế") }).cắtDòng(1),
                                            $("<div>", { class: "fs09 c6", text: dữLiệu.môTả(i, "ế") }).cắtDòng(2),
                                            $('<div>', { id: '', class: 'c6 fs08 ptb7', icon: "timer::mr10,fwb", text: iDate(d.ấ, "{j}/{n}/{f}") }),
                                        ),
                                    ),
                                )
                            })
                        )
                    });
                };
                o.khung.iMsg(div, 1, $.gộp({
                    bo: "pa0",
                    tip: false,
                    position: {
                        at: "bottom center ",
                        my: "top center",
                    },
                    che: true
                }, o.iMsg));
            })
        })

    }
    this.tìmXs = function () {
        return $('<div>', { id: '', class: 'cf pr chứaBọnTìm', icon: 'search::fs14,bấmĐc,mr5,iconSearch', text: '' }).each(function () {
            var t = $(this);
            $(document).mouseup(function (e) {
                if (!t.is(e.target) && t.has(e.target).length === 0 && !t.find(".ôGõTìmKiếm").cóLớp("iMsg")) {
                    t.find(".chứaTìmKiếm").width(0);
                }
            });
            t.on("click", ".iconSearch", function (e) {
                t.find(".chứaTìmKiếm").css({ width: t.find(".chứaTìmKiếm").width() == 0 ? "80vw" : "0vw" })
            }).append(
                $('<div>', { id: '', class: 'pa t50 tty ta5 r1 c0 chứaTìmKiếm oh', text: '' }).css({ width: "0vh" }).append(
                    $('<div>', { id: '', class: 'pr5', text: '' }).append(
                        $('<input>', { id: '', class: '', placeholder: 'Gõ để tìm kiếm', text: '' }).iInput({
                            bo: "w1,ôGõTìmKiếm",
                            nhãn: false,
                        }).chờKhóa("keyup", function (e) {
                            var t = $(this);
                            Trang.tìmKiếm({
                                khung: t.closest(".bọc"),
                                từKhóa: e.target.value,
                                sốBài: 20,
                            })
                        }, 500, "tìmKiếm"),
                    ),
                ),
            );
        })
    }
}
giaoDiện = new function () {
    this.list = function (o) {
        var o = $.gộp({
            bàiViết: [],
            sốBài: 6,
            cắtTiêuĐề: màn("xs") ? 1 : 2,
            cắtDòng: màn("xs") ? 2 : 3,
        }, o);
        o.sốBài = o.sốBài || 6;
        return $('<div>', { id: '', class: 'df fww', text: '' }).append(
            mảng(o.bàiViết).lọc("bàiViết").map(function (i, d) {
                if (d < o.sốBài) {
                    d = config("bàiViết." + i) || {};
                    return $('<a>', { href: dữLiệu.url(i, "ế"), id: '', class: 'col-xs-12 pa10 bb1 bsda bcd ptb15 bg1o1h', text: '' }).each(function () { }).append(
                        $('<div>', { id: '', class: 'df fww', text: '' }).append(
                            $('<div>', { id: '', class: 'fwb col-xs-12 col-md-10 cl1b', text: dữLiệu.tên(i, "ế"), y: '▸' }).cắtD(o.cắtTiêuĐề),//.chờ(function () { $(this).icon("play_arrow::cl1,fs12,bấmĐc") }, 123),
                            $('<div>', { id: '', class: 'col-xs-12 c6 fs09 dfn col-md-2 tar wsn', icon: 'insert_invitation::fs12', text: iDate(d.ậ || d.ấ, "{j}/{n}/{f}") }),
                        ),
                        o.cắtDòng ? $('<div>', { id: '', class: 'dn-xs pr25 mt10', text: dữLiệu.môTả(i, "ế") }).cắtDòng(o.cắtDòng) : "",
                    ).chờ(function () {
                        // cl($(this).is(":last-child")).sửaLớp("bb0")
                        $(this).nếu($(this).is(":last-child"), function () { $(this).sửaLớp("bb0") })
                    }, 123);
                }
            })
        );
    }
    this.danhSách = function (o) {
        var o = $.gộp({
            bàiViết: [],
            sốBài: 3,
            cắtTiêuĐề: màn("xs") ? 1 : 2,
            cắtDòng: màn("xs") ? 2 : 3,
        }, o);
        return $('<div>', { id: '', class: 'grid', text: '' }).append(
            mảng(o.bàiViết).lọc("bàiViết").map(function (i, d) {
                if (d < o.sốBài) {
                    d = config("bàiViết." + i) || {};
                    return $('<a>', { href: dữLiệu.url(i, "ế"), id: '', class: 'df aic cb', text: '' }).append(
                        $('<div>', { id: '', class: 'col-xs-4 col-md-3 pa10', text: '' }).append(
                            $('<div>', { id: '', class: 'bgrn bgpc bgsc pb169 ', text: '' }).ảnh(i, "ế", true),
                        ),
                        $('<div>', { id: '', class: 'col-xs-8 col-md-9 pa10', text: '' }).append(
                            $('<div>', { id: '', class: 'fwb mb4', text: dữLiệu.tên(i, "ế") }).cắtDòng(o.cắtTiêuĐề),
                            $('<div>', { id: '', class: '', text: dữLiệu.môTả(i, "ế") }).cắtDòng(o.cắtDòng),
                            $('<div>', { id: '', class: 'c6 mb5 fs09', icon: 'insert_invitation::fs12', text: iDate(d.ậ || d.ấ, "{j}/{n}/{f}") }),
                        ),
                    )
                }
            })
        )
    }
    this.timeline = function (o) {
        var o = $.gộp({
            bàiViết: [],
            sốBài: 3,
            cắtTiêuĐề: 2,
            cắtDòng: 3,
        }, o);
        return $('<div>', { id: '', class: 'pr', text: '' }).append(
            $('<div>', { id: '', class: 'pa t0 l50 ttx bgcyd h1', text: '' }).width(2),
            mảng(o.bàiViết).lọc("bàiViết").map(function (i, d) {
                if (d < o.sốBài) {
                    d = config("bàiViết." + i) || {};
                    var lẻ = function (d, b) {
                        var j = mảng(o.bàiViết).indexOf(i);
                        if (d || b) {
                            return j % 2 ? (" " + d) : (" " + b || "");
                        } else {
                            return j % 2;
                        }
                    };
                    return $('<div>', { id: '', class: 'pr df ' + lẻ("jcfe"), text: '' }).append(
                        $('<div>', { id: '', class: 'pa tl50 tt bra50 bg1 wh10', text: '' }),
                        $('<div>', { id: '', class: 'col-xs-6 df jcsc', text: '' }).append(
                            $('<div>', { id: '', class: 'df w1 col-xs-10 fww' + lẻ("", "fdrr"), text: '' }).append(
                                $('<div>', { id: '', class: 'pa10 col-xs-12 col-sm-4 df aic', text: '' }).append(
                                    $('<div>', { id: '', class: 'sc12hc bra50 dfn w1', text: '' }).append(
                                        $('<div>', { id: '', class: 'bgrn bgpc bgsc bra50 dfn pb1', text: '' }).ảnh(i, "ế", true),
                                    ),
                                ),
                                $('<div>', { id: '', class: 'pa10 col-xs-12 col-sm-8 fww', text: '' }).append(
                                    $('<div>', { id: '', class: 'fwb fs12 cl1 mb10', text: dữLiệu.tên(i, "ế") }).cắtDòng(o.cắtTiêuĐề),
                                    $('<div>', { id: '', class: 'c6 mb10 ', icon: 'insert_invitation::fs12', text: iDate(d.ậ || d.ấ, "{j}/{n}/{f}") }),
                                    $('<div>', { id: '', class: '', text: dữLiệu.môTả(i, "ế") }).cắtDòng(o.cắtDòng),
                                ),
                            ),
                        ),
                    )
                }
            })
        )
    }
    this.ngang = function (o) {
        var o = $.gộp({
            bàiViết: [],
            sốBài: 3,
            cắtTiêuĐề: màn("xs") ? 1 : 2,
            cắtDòng: màn("xs") ? 2 : 3,
            ngang: "",
            col: ""
        }, o),
            col;
        o.ngang = o.ngang || o.sốBài;
        switch (o.ngang) {
            case 3:
                col = "col-md-4 col-xs-12 ";
                break;
        }
        return $('<div>', { id: '', class: 'grid', text: '' }).append(
            mảng(o.bàiViết).lọc("bàiViết").map(function (i, d) {
                if (d < o.sốBài) {
                    d = config("bàiViết." + i) || {};
                    return $('<a>', { href: dữLiệu.url(i, "ế"), id: '', class: o.col || (col + ' pa10'), text: '' }).append(
                        $('<div>', { id: '', class: 'bgrn bgpc bgsc pb169 mb10', text: '' }).ảnh(i, "ế", true),
                        $('<div>', { id: '', class: 'fwb mb4', text: dữLiệu.tên(i, "ế") }).cắtDòng(o.cắtTiêuĐề),
                        $('<div>', { id: '', class: '', text: dữLiệu.môTả(i, "ế") }).cắtDòng(o.cắtDòng),
                        $('<div>', { id: '', class: 'c6 mb5 fs09 tar', icon: 'insert_invitation::fs12', text: iDate(d.ậ || d.ấ, "{j}/{n}/{f}") }),
                    )
                }
            })
        )
    }
};
(function () {
    var cũ;
    $(window).chờKhóa("resize", function () {
        $("[classb]").each(function () {
            var t = $(this),
                o = Jd(t.attr("classb")),
                _o = {},
                w = $(window).width();
            $.map(o, function (d, i) {
                _o[i] = mảng((typeof d == "string" ? d : "").split(",")).map(function (chữ) {
                    chữ = chữ.search("-") == 0 ? chữ.replace("-", "") : ("-" + chữ);
                    return chữ;
                }).join(",");
            });
            if (o.xl && w > 1199) {
                t.sửaLớp(o.xl);
                $.map(_o, function (d, i) {
                    i != "xl" && t.sửaLớp(d);
                })
            } else if (o.lg && 991 < w && w <= 1199) {
                t.sửaLớp(o.lg)
                $.map(_o, function (d, i) {
                    i != "lg" && t.sửaLớp(d);
                })
            } else if (o.md && 767 < w && w <= 991) {
                t.sửaLớp(o.md)
                $.map(_o, function (d, i) {
                    i != "md" && t.sửaLớp(d);
                })
            } else if (o.sm && 479 < w && w <= 767) {
                t.sửaLớp(o.sm);
                $.map(_o, function (d, i) {
                    i != "sm" && t.sửaLớp(d);
                })
            } else if (o.xs && w <= 479) {
                t.sửaLớp(o.xs);
                $.map(_o, function (d, i) {
                    i != "xs" && t.sửaLớp(d);
                })
            } else {
                $.map(_o, function (d, i) {
                    t.sửaLớp(d);
                })
            }
        })
    }, 123, "classB");
    var domain = location.origin,
        jsTrang = "";
    switch (location.host) {
        case "es.hanu.edu.vn":
            jsTrang = "tayBanNha"
            break;
        case "gdct.hanu.edu.vn":
            jsTrang = "giaoDucChinhTri";
            break;
    }
    CẦN.js(domain + "/js/" + jsTrang + ".js", true);
})();
