// khôngGian.chuyênMục.trước(id);
// khôngGian.chuyênMục.sau(id);
config("ảnhMặcĐịnh", "./img/anhBia.png")
var B = $("body"),
    thân = $('<div>', { id: '', class: '', text: '' }),
    chuyênMụcLớn = 7365,
    khoa = 179,
    chuỗiCfg = "web." + chuyênMụcLớn;
CM = new function () {
    this.cấuHình = {
        body: $("body"),
        // thân: $('<div>', { id: '', class: '', text: '' }),
        khoa: "Khoa Tiếng Tây Ban Nha",
        chuỗiCfg: "web.7365",
        chuyênMục: "7365",
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
            menuTrên: [
                7381/*"Sự kiện"*/,
                8926/*"Thông Báo"*/,
                8922/*"Giao lưu - Hợp tác"*/,
                8931/*"Cựu sinh viên"*/,
            ],
            menuDưới: [
                "Trang chủ",
                7370/*"Giới thiệu"*/,
                8923/*"Hợp tác"*/,
                7371/*"Đào tạo"*/,
                7377/*"Tin tức - Sự kiện"*/,
                8924/*"Các mẫu đơn"*/,
                7369/*"Hỏi & đáp"*/,
            ],
            menuChân: [
                7370/*"Giới thiệu"*/,
                8935/*Tư vấn học tập*/,
                7371/*Đào tạo*/,
                8936/*Tài nguyên*/,
                7366/*Tuyển sinh*/,
                8937/*Liên hệ*/
            ],
            menuChuyênMục: [
                { chuyênMục: "8965", icon: "school" },
                { chuyênMục: "8966", icon: "group_add" },
                { chuyênMục: "8967", icon: "business_center" },
                { chuyênMục: "8969", icon: "connect_without_contact" },
            ],
        },
        hỏiĐáp: "id"
    }
    // this.cầnBàiViết = function () { //chuyênmục,sốbài,callback
    //     var sốBài = 3,
    //         cm,
    //         fn = rf,
    //         chuỗiCfg = "",
    //         tải;
    //     Array.from(arguments).map(function (a) {
    //         if ($.isFunction(a)) {
    //             fn = a;
    //         } else {
    //             !cm ? (cm = a) : (sốBài = a);
    //         }
    //     });
    //     chuỗiCfg = khoa + "." + cm + "." + sốBài;
    //     tải = function (a) {
    //         xửLý("bàiViết.tải." + sốBài, { d: { ụ: cm } }, { bỏQua: false }, function (bv) {
    //             TẢI.db("bàiViết." + bv, function () {
    //                 cl("TẢI." + bv);
    //                 var ô = {};
    //                 if (!empty(bv)) {
    //                     mảng(bv).map(function (i, d) {
    //                         $.chấm(ô, "c." + i, config("bàiViết." + i));
    //                     })
    //                     $.chấm(ô, "bv", bv);
    //                 } else {
    //                     ô = ud;
    //                 }
    //                 a && fn.call(this, bv);
    //                 cfg(chuỗiCfg, ô);
    //             })
    //         })
    //     };
    //     cfg(chuỗiCfg, function (o) {
    //         if (empty(o)) {
    //             tải(true); //callback
    //         } else {
    //             mảng(o.bv).map(function (i) {
    //                 config("bàiViết." + i, o.c[i]);
    //             })
    //             fn.call(this, o.bv);
    //             chờ(function () {
    //                 tải();//ko callBack
    //             }, 15000)
    //         }
    //     })
    // }
    this.cache = function () {//call back và tải cache
        var callback = rf,
            cache = false, //truyền vào true thì sẽ tải cache và reload
            o = {
                chuyênMục: chuyênMụcLớn,
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
                }
            },
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
                o = $.gộp(o, a);
            }
        })
        chạy = function () {
            var fn = fns.pop();
            if ($.isFunction(fn)) {
                fn(chạy);
            } else {
                đếm--;
                if (đếm == 0) {
                    xửLý("bàiViết.tải.1000", { d: { ụ: o.chuyênMục + "++" } }, function (allBv) {
                        cl("allBv", allBv)
                        TẢI.db("bàiViết." + allBv, function () {
                            mảng(allBv).map(function (i, d) {
                                //Cache dữ liệu bài viết trên trang chủ
                                $.chấm(_cfg, "bàiViết." + i, config("bàiViết." + i));
                            });
                            cl("chưa có cache - tải cache xong", _cfg);
                            cfg(chuỗiCfg, _cfg, function () {
                                callback.call(this, _cfg);
                                chờ(function () {
                                    CM.sitemap(function () {
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
        cfg(chuỗiCfg, function (a) {
            _cfg = a;
            if (empty(_cfg) || cache) {
                _cfg = {};
                TẢI.db("chuyênMục." + o.chuyênMục, { bỏQua: false }, function () {
                    cmCon = $.gộp(mảng(o.chuyênMục), khôngGian.chuyênMục.sau(o.chuyênMục));
                    TẢI.db(["chuyênMục." + cmCon, "chuyênLực." + cmCon], { bỏQua: false }, function () {
                        mảng(cmCon).map(function (i, d) {
                            //cache tất cả chuyên mục
                            $.chấm(_cfg, "chuyênMục." + i, config("chuyênMục." + i));
                            $.chấm(_cfg, "chuyênLực." + i, config("chuyênLực." + i));
                        });
                        $.map(o.trangChủ, function (d, i) {
                            fns.push(function (fn) {
                                xửLý("bàiViết.tải." + d.sốBài, { d: d.điềuKiện }, function (bv) {
                                    bvCần = $.gộp([], bvCần, bv);
                                    //cách số lượng bài viết trên trang chủ
                                    $.chấm(_cfg, "trangChủ." + i, mảng(bv));
                                    fn && fn.call(this, _cfg);
                                })
                            })
                        });
                        đếm = count(fns)
                        chạy();
                        chạy();
                        chạy();
                    })
                })
            } else {
                cl("Đã có cache", _cfg);
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
    this.sitemap = function (fn) {
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
CM.cache({
    chuyênMục: chuyênMụcLớn,
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
    }
}, function (data) {
    data.menuTrên = [
        7381/*"Sự kiện"*/,
        8926/*"Thông Báo"*/,
        8922/*"Giao lưu - Hợp tác"*/,
        8931/*"Cựu sinh viên"*/,
    ];
    data.menuDưới = [
        "Trang chủ",
        7370/*"Giới thiệu"*/,
        8923/*"Hợp tác"*/,
        7371/*"Đào tạo"*/,
        7377/*"Tin tức - Sự kiện"*/,
        8924/*"Các mẫu đơn"*/,
        7369/*"Hỏi & đáp"*/,
    ];
    data.menuChân = [
        7370/*"Giới thiệu"*/,
        8935/*Tư vấn học tập*/,
        7371/*Đào tạo*/,
        8936/*Tài nguyên*/,
        7366/*Tuyển sinh*/,
        8937/*Liên hệ*/
    ];
    data.menuChuyênMục = [
        { chuyênMục: "8965", icon: "school" },
        { chuyênMục: "8966", icon: "group_add" },
        { chuyênMục: "8967", icon: "business_center" },
        { chuyênMục: "8969", icon: "connect_without_contact" },
    ];
    bốCục = new function () {
        var k,
            chuyênMục;
        this.menuReponsive = function () {
            var menu;
            return $('<div>', { id: '', class: 'bg1 plr10 ptb5 bóng ps t0 l0 z15 w1' }).append(
                menu = $('<div>', { id: '', class: 'pf pa r0 t0 b0 bgcf z9 bóng ta5 oh', text: '' }).width(0).append(
                    $('<div>', { id: '', class: '', text: '' }).width(300).append(
                        $('<div>', { id: '', class: 'df pa10 bg1o1 jcsb bóng', text: '' }).append(
                            $('<div>', { id: '', class: 'df aic o0', text: '' }).append("."),
                            $('<div>', { id: '', class: 'df aic', text: '' }).append(
                                $('<div>', { id: '', class: '', icon: 'close::fs14,bấmĐc,mr5', text: '' }).click(function () {
                                    menu.width(0)
                                }),
                            ),

                        ),
                        $('<div>', { id: '', class: 'pa10', text: '' }).append(
                            data.menuDưới.map(function (i) {
                                return $('<a>', { class: 'pa10 bb1 bsda bcd db fwb crd', href: dữLiệu.url(i, "ụ") || "/", text: dữLiệu.tên(i, "ụ", "Trang chủ") }).click(function () { menu.width(0) })
                            })
                        ),
                    ),
                ),
                $('<div>', { id: '', class: 'df jcsb', text: '' }).append(
                    $('<div>', { id: '', class: 'df aic', text: '' }).append(
                        $('<a>', { href: "/", id: '', class: 'db bgrn bgpc bgsc wh30 logoMenu bra50', style: 'background-image: url("/img/logo.jpg")', text: '' }),
                        $('<div>', { id: '', class: 'ml5 cf', text: '' }).append(
                            $('<div>', { id: '', class: 'ttu fwb', text: 'Khoa tiếng Tây Ban Nha' }),
                            $('<div>', { id: '', class: 'fs09', text: 'Departamento de Español' }),
                        ),
                    ),
                    $('<div>', { id: '', class: 'df aic', text: '' }).append(
                        // $('<div>', { id: '', class: 'cf', icon: 'search::fs14,bấmĐc,mr5', text: '' }),
                        Trang.tìmXs(),
                        $('<div>', { id: '', class: 'cf', icon: 'menu::fs14,bấmĐc,mr5', text: '' }).click(function () {
                            menu.width(300)
                        }),
                    ),
                ),
            )
        }
        this.header = function () {
            return $('<div>', { id: '', class: 'bg1', text: '' }).append(
                $('<div>', { id: '', class: 'container', text: '' }).append(
                    $('<div>', { id: '', class: 'df jcsb', text: '' }).append(
                        $('<a>', { href: '/', id: '', class: 'df aic', text: '' }).append(
                            $('<div>', { id: '', class: 'bgcf pa15', icon: "home::cl1,fs12", text: '' }).on('taphold', function name(params) {
                                CM.cache(true);
                            }),
                            $('<div>', { id: '', class: 'cf fs12 fwb ml5', text: 'Trường Đại học Hà Nội' }),
                        ),
                        $('<div>', { id: '', class: 'df aic', text: '' }).append(
                            $('<input>', { id: '', class: 'bra25 on ', text: '', placeholder: 'Tìm kiếm' }).iInput({
                                nhãn: true,
                                bo: "bra25,-bra3",
                            }).width(280).chờ(function () {
                                var t = $(this);
                                t.closest(".bọc").find(".kèm").sửaLớp("-phv,-o0").icon("search::fs12,cl1,fwb,nútTìm")
                                t.closest(".bọc").find(".nútTìm").off().tip("Bấm để tìm kiếm")
                            }, 12),
                        ),
                        $('<div>', { id: '', class: 'df aic', text: '' }).append(
                            $('<div>', { id: '', class: 'cf ttu fwb bấmĐc', icon: "person::fs12", text: 'Đăng nhập' }),
                            // $('<div>', { id: '', class: 'cf ttu fwb bấmĐc ml5', icon: "settings::fs12", text: '' }),
                        ),
                    ),
                ),
            );
        }
        this.menu = function () {
            $(window).scroll(function () {
                !B.find(".thanhMenu").data("top") && B.find(".thanhMenu").data("top", B.find(".thanhMenu").offset().top);
                if ($(window).scrollTop() >= B.find(".thanhMenu").data("top")) {
                    B.find(".thanhMenu").sửaLớp("pf").find(".logoMenu").sửaLớp("-wh70,wh30").end().find(".menuTênKhoa").sửaLớp("-mb5").parent().sửaLớp("fs07");
                    B.find(".thanhMenu .cuộnẨn").sửaLớp("dn");
                    B.find(".thanhMenu .menu").sửaLớp("pa25");
                } else {
                    B.find(".thanhMenu .cuộnẨn").sửaLớp("-dn");
                    B.find(".thanhMenu").sửaLớp("-pf").find(".logoMenu").sửaLớp("wh70,-wh30").end().find(".menuTênKhoa").sửaLớp("mb5").parent().sửaLớp("-fs07");
                    B.find(".thanhMenu .menu").sửaLớp("-pa25");
                }
            })
            return $('<div>', { id: '', class: 'bgcf thanhMenu w1 t0 l0 z15 bóng', text: '' }).append(
                $('<div>', { id: '', class: 'container', text: '' }).append(
                    $('<div>', { id: '', class: 'cb ', text: '' }).append(
                        $('<div>', { id: '', class: 'tar grid cuộnẨn', text: '' }).append(
                            data.menuTrên.map(function (i, d) {
                                d = config("chuyênMục." + i) || {};
                                return $('<a>', { href: dữLiệu.url(i, "ụ") || "/", id: '', class: 'cb cl1 pa10 plr15 ttu fwb bb2cl1h menu', text: d.ê }).click(function () {
                                    $(".menu.bb2cl1").sửaLớp("-bb2cl1");
                                    $(this).sửaLớp("bb2cl1");
                                });
                            })
                        ),
                        $('<div>', { id: '', class: 'df aic cuộnẨn', text: '' }).append(
                            $('<a>', { href: "/", id: '', class: 'db bgrn bgpc bgsc wh70 logoMenu', style: 'background-image: url("/img/logo.jpg")', text: '' }),
                            $('<div>', { id: '', class: 'ml10', text: '' }).append(
                                $('<div>', { id: '', class: 'cl1 fs12 fwb ttu mb5 menuTênKhoa', text: 'Khoa tiếng Tây Ban Nha' }),
                                $('<div>', { id: '', class: 'fsi fs12 c6', text: 'Departamento de Español' }),
                            ),
                        ),
                        $('<div>', { id: '', class: 'flex', text: '' }).append( //
                            data.menuDưới.map(function (i, d) {
                                d = config("chuyênMục." + i) || {};
                                return $('<a>', { href: dữLiệu.url(i, "ụ") || "/", id: '', class: 'cl1 pa10 plr15 ttu fwb bb2cl1h menu ' + (i == "Trang chủ" ? "bb2cl1" : ""), text: d.ê || i }).click(function () {
                                    $(".menu.bb2cl1").sửaLớp("-bb2cl1");
                                    $(this).sửaLớp("bb2cl1");
                                });
                            })
                        ),
                    ),
                ),
            );
        }
        this.trangChủ = function () {
            var g = {};
            g.s1 = new function () {
                this.s = "s1";
                this.sựKiện = function () {
                    return $('<div>', { id: '7381', class: 'bg1o1 ptb50', text: '', classXs: "-ptb50,ptb25" }).each(function () {
                        var cm = $(this).ID();
                        $(this).append(
                            $('<div>', { id: '', class: 'container ', text: '' }).append(
                                $('<a>', { href: dữLiệu.url(cm, "ụ"), id: '', class: 'db tac grid', text: '' }).append(
                                    $('<div>', { id: '', class: 'plr40 ptb10 mb40 fwb cf fs15 ttu bra5 bg1', classXs: '-mb40,mb15,-fs15,-plr40,plr15,-ptb10,ptb3', text: dữLiệu.tên(cm, "ụ") }),
                                ),
                                giaoDiện.timeline({
                                    bàiViết: data.trangChủ[cm],
                                    sốBài: 3,
                                    cắtTiêuĐề: 2,
                                    cắtDòng: 3,
                                })
                                // màn("sm") ?
                                //     giaoDiện.danhSách({
                                //         bàiViết: data.trangChủ[cm],
                                //         sốBài: 3,
                                //         cắtTiêuĐề: màn("xs") ? 1 : 2,
                                //         cắtDòng: màn("xs") ? 2 : 3,
                                //     }) :
                                //     giaoDiện.timeline({
                                //         bàiViết: data.trangChủ[cm],
                                //         sốBài: 3,
                                //         cắtTiêuĐề: 2,
                                //         cắtDòng: 3,
                                //     })
                            )
                        )
                    })
                }
                this.giaoLưuHợpTác = function () {
                    return $('<div>', { id: '8922', class: 'bg1o1 ptb50', text: '', classXs: "-ptb50,ptb25" }).each(function () {
                        var cm = $(this).ID();
                        $(this).append(
                            $('<div>', { id: '', class: 'container', text: '' }).append(
                                $('<a>', { href: dữLiệu.url(cm, "ụ"), id: '', class: 'db tac grid', text: '' }).append(
                                    $('<div>', { id: '', class: 'plr40 ptb10 mb40 fwb cf fs15 ttu bra5 bg1', classXs: '-mb40,mb15,-fs15,-plr40,plr15,-ptb10,ptb3', text: dữLiệu.tên(cm, "ụ") }),
                                ),
                                $('<div>', { id: '', class: 'df fww jcsb', text: '' }).append(
                                    range(0, 2).map(function (j) {
                                        var chuyênLực = mảng(config("chuyênLực." + cm)),
                                            i = chuyênLực[j];
                                        return !i ? "" : $('<a>', { href: dữLiệu.url(i, "ụ"), id: '', class: 'db col-xs-4 col-md-3 col-lg-2 pa10', classXs: '-col-xs-4,w30', text: '' }).append(
                                            $('<div>', { id: '', class: 'maa', text: '' }).append(//.css("maxWidth", 300)
                                                $('<div>', { id: '', class: 'bgrn bgpc bgsc pb1 maa bra50', text: '' }).ảnh(i, "ụ", true),
                                            ),
                                            $('<div>', { id: '', class: 'fs15 fs11-xs cl1 fwb tac pt25 pb15 lh15', classXs: '-pt25,pt15,-lh15', text: dữLiệu.tên(i, "ụ") }),
                                        );
                                    }),
                                ),
                            ),
                        )
                    })
                }
                this.cựuSinhViên = function () {
                    return $('<div>', { id: '8931', class: 'bgcf ptb50', text: '', classXs: "-ptb50,ptb25" }).each(function () {
                        var cm = $(this).ID();
                        $(this).append(
                            $('<div>', { id: '', class: 'tac grid', text: '' }).append(
                                $('<a>', { href: dữLiệu.url(cm, "ụ"), id: '', class: 'plr40 ptb10 mb40 fwb cf fs15 ttu bra5 bgcyd', classXs: '-mb40,mb15,-fs15,-plr40,plr15,-ptb10,ptb3', text: dữLiệu.tên(cm, "ụ") }),
                            ),
                            $('<div>', { id: '', class: 'container', text: '' }).append(
                                $('<div>', { id: '', class: 'df fww jcsb', text: '' }).append(
                                    range(0, 1).map(function (j) {
                                        var chuyênLực = mảng(config("chuyênLực." + cm)),
                                            i = chuyênLực[j];
                                        return !i ? "" : $('<a>', { href: dữLiệu.url(i, "ụ"), id: '', class: ' col-xs-12 col-md-5 df pb25-lg', text: '' }).append(
                                            $('<div>', { id: '', class: ' col-xs-12 col-md-6 plr10', text: '' }).append(
                                                $('<div>', { id: '', class: 'pr50', text: '' }).append(
                                                    $('<div>', { id: '', class: 'bgrn bgpc bgsc pb23', text: '' }).ảnh(i, "ụ", true).css({ "box-shadow": "20px 20px #fccf02" }),
                                                ),
                                            ),
                                            $('<div>', { id: '', class: ' col-xs-12 col-md-6 plr10 df fdc jcsb', text: '' }).append(
                                                $('<div>', { id: '', class: 'fs15 fs11-xs cl1 fwb tac pa15', text: dữLiệu.tên(i, "ụ") }),
                                                $('<div>', { id: '', class: '', text: dữLiệu.môTả(i, "ụ") }),
                                                $('<a>', { href: dữLiệu.url(i, "ụ"), id: '', class: 'fsi c6 cl1h tar', text: 'Xem thêm' }),
                                            ),
                                        );
                                    }),
                                ),
                            ),
                        )
                    })
                }
            }
            g.s2 = new function () {
                this.s = "s2";
                this.sựKiện = function () {
                    return $('<div>', { id: '7381', class: 'bg1o1 ptb50', text: '', classXs: "-ptb50,ptb25" }).each(function () {
                        var cm = $(this).ID(),
                            div = $('<div>', { id: '', class: 'df fww', text: '' }).xửLý("bàiViết.tải.4", { d: { ụ: cm } }, { cache: true }, function (bvs) {
                                div.append(
                                    $('<div>', { id: '', class: 'col-xs-12 col-md-4 pa10 df aic', text: '' }).append(
                                        $('<div>', { id: '', class: 'bgrn bgpc bgsc bra5', text: '' }).css({ width: "85%", height: "100%" }).ảnh(cm, "ụ", true)
                                    ),
                                    $('<div>', { id: '', class: 'col-xs-12 col-md-8 df fww', text: '' }).append(
                                        mảng(bvs).map(function (i, d) {
                                            d = config("bàiViết." + i);
                                            return $('<a>', { href: dữLiệu.url(i, "ế"), id: '', class: 'col-xs-12 col-md-6 df fww ', text: '' }).append(
                                                $('<div>', { id: '', class: 'col-xs-5 pa10', text: '' }).append(
                                                    $('<div>', { id: '', class: 'bra50 bgrn bgpc bgsc pb1', text: '' }).ảnh(i, "ế", true),
                                                ),
                                                $('<div>', { id: '', class: 'col-xs-7 pa10 df aic', text: '' }).append(
                                                    $('<div>', { id: '', class: '', text: '' }).append(
                                                        $('<div>', { id: '', class: 'fwb fs12 cl1 mb5', text: dữLiệu.tên(i, "ế") }).cắtDòng(2),
                                                        $('<div>', { id: '', class: '', text: dữLiệu.môTả(i, "ế") }).cắtDòng(2),
                                                        $('<div>', { id: '', class: 'c6 fs09 tar dfn', icon: 'insert_invitation::fs12', text: iDate(d.ậ || d.ấ, "{j}/{n}/{f}") }),
                                                    ),
                                                ),
                                            )
                                        })
                                    ),
                                )
                            });
                        $(this).append(
                            $('<div>', { id: '', class: 'container ', text: '' }).append(
                                $('<a>', { href: dữLiệu.url(cm, "ụ"), id: '', class: 'db tac grid', text: '' }).append(
                                    $('<div>', { id: '', class: 'plr40 ptb10 mb40 fwb cf fs15 ttu bra5 bg1', classXs: '-mb40,mb15,-fs15,-plr40,plr15,-ptb10,ptb3', text: dữLiệu.tên(cm, "ụ") }),
                                ),
                                div
                                // màn("sm") ?
                                //     giaoDiện.danhSách({
                                //         bàiViết: data.trangChủ[cm],
                                //         sốBài: 3,
                                //         cắtTiêuĐề: màn("xs") ? 1 : 2,
                                //         cắtDòng: màn("xs") ? 2 : 3,
                                //     }) : div
                            )
                        )
                    })
                }
                this.giaoLưuHợpTác = function () {
                    return $('<div>', { id: '8922', class: 'bg1o1 ptb50', text: '', classXs: "-ptb50,ptb25" }).each(function () {
                        var cm = $(this).ID();
                        $(this).append(
                            $('<div>', { id: '', class: 'container', text: '' }).append(
                                $('<a>', { href: dữLiệu.url(cm, "ụ"), id: '', class: 'db tac grid', text: '' }).append(
                                    $('<div>', { id: '', class: 'plr40 ptb10 mb40 fwb cf fs15 ttu bra5 bg1', classXs: '-mb40,mb15,-fs15,-plr40,plr15,-ptb10,ptb3', text: dữLiệu.tên(cm, "ụ") }),
                                ),
                                $('<div>', { id: '', class: 'df fww jcsb', text: '' }).append(
                                    range(0, 2).map(function (j) {
                                        var chuyênLực = ["8929", "8923", "8930"],//mảng(config("chuyênLực." + cm)),
                                            i = chuyênLực[j];
                                        cl(chuyênLực)
                                        return !i ? "" : $('<a>', { href: dữLiệu.url(i, "ụ"), id: '', class: 'db col-xs-4 col-md-3 col-lg-2 pa10', classXs: '-col-xs-4,w30', text: '' }).append(
                                            $('<div>', { id: '', class: 'maa', text: '' }).append(//.css("maxWidth", 300)
                                                $('<div>', { id: '', class: 'bgrn bgpc bgsc pb1 maa bra50', text: '' }).ảnh(i, "ụ", true),
                                            ),
                                            $('<div>', { id: '', class: 'fs15 fs11-xs cl1 fwb tac pt25 pb15 lh15', classXs: '-pt25,pt15,-lh15', text: dữLiệu.tên(i, "ụ") }),
                                        );
                                    }),
                                ),
                            ),
                        )
                    })
                }
                this.cựuSinhViên = function () {
                    return $('<div>', { id: '8931', class: 'bgcf ptb50', text: '', classXs: "-ptb50,ptb25" }).each(function () {
                        var cm = $(this).ID();
                        $(this).append(
                            $('<div>', { id: '', class: 'tac grid', text: '' }).append(
                                $('<a>', { href: dữLiệu.url(cm, "ụ"), id: '', class: 'plr40 ptb10 mb40 fwb cf fs15 ttu bra5 bgcyd', classXs: '-mb40,mb15,-fs15,-plr40,plr15,-ptb10,ptb3', text: dữLiệu.tên(cm, "ụ") }),
                            ),
                            $('<div>', { id: '', class: 'container', text: '' }).append(
                                $('<div>', { id: '', class: 'df fww jcsb', text: '' }).append(
                                    range(0, 1).map(function (j) {
                                        var chuyênLực = mảng(config("chuyênLực." + cm)),
                                            i = chuyênLực[j];
                                        return !i ? "" : $('<a>', { href: dữLiệu.url(i, "ụ"), id: '', class: ' col-xs-12 col-md-5 df pb25-lg', text: '' }).append(
                                            $('<div>', { id: '', class: ' col-xs-12 col-md-6 plr10', text: '' }).append(
                                                $('<div>', { id: '', class: 'pr50', text: '' }).append(
                                                    $('<div>', { id: '', class: 'bgrn bgpc bgsc pb23', text: '' }).ảnh(i, "ụ", true).css({ "box-shadow": "20px 20px #fccf02" }),
                                                ),
                                            ),
                                            $('<div>', { id: '', class: ' col-xs-12 col-md-6 plr10 df fdc jcsb', text: '' }).append(
                                                $('<div>', { id: '', class: 'fs15 fs11-xs cl1 fwb tac pa15', text: dữLiệu.tên(i, "ụ") }),
                                                $('<div>', { id: '', class: '', text: dữLiệu.môTả(i, "ụ") }),
                                                $('<a>', { href: dữLiệu.url(i, "ụ"), id: '', class: 'fsi c6 cl1h tar', text: 'Xem thêm' }),
                                            ),
                                        );
                                    }),
                                ),
                            ),
                        )
                    })
                }
                // this.cựuSinhViên = function () {
                //     return $('<div>', { id: '8931', class: 'bgcf ptb50', text: '' ,classXs:"-ptb50,ptb25"}).each(function () {
                //         var cm = $(this).ID();
                //         $(this).append(
                //             $('<div>', { id: '', class: 'tac grid', text: '' }).append(
                //                 $('<a>', { href: dữLiệu.url(cm, "ụ"), id: '', class: 'plr40 ptb10 mb40 fwb cf fs15 ttu bra5 bgcyd',classXs:'-mb40,mb15,-fs15,-plr40,plr15,-ptb10,ptb3', text: dữLiệu.tên(cm, "ụ") }),
                //             ),
                //             $('<div>', { id: '', class: 'container', text: '' }).append(
                //                 $('<div>', { id: '', class: 'df fww', text: '' }).append(
                //                     range(0, 1).map(function (j) {
                //                         var chuyênLực = mảng(config("chuyênLực." + cm)),
                //                             i = chuyênLực[j];
                //                         return !i ? "" : $('<a>', { href: dữLiệu.url(i, "ụ"), id: '', class: ' col-xs-12 col-md-4 df pb25-lg', text: '' }).append(
                //                             $('<div>', { id: '', class: ' col-xs-12 col-md-6 plr10', text: '' }).append(
                //                                 $('<div>', { id: '', class: 'bgrn bgpc bgsc pb23 pr', text: '' }).ảnh(i, "ụ", true).append(
                //                                     $('<div>', { id: '', class: 'pa b0 l0 w1 pa15', text: '' }).append(
                //                                         $('<div>', { id: '', class: 'bgcf tac cl1 fwb fs15 lh1 pa15', text: dữLiệu.tên(i, "ụ") }).css({ "box-shadow": "5px 5px #fccf02" }),
                //                                     ),
                //                                 )
                //                                 // $('<div>', { id: '', class: 'pr50', text: '' }).append(
                //                                 //     $('<div>', { id: '', class: 'bgrn bgpc bgsc pb23', text: '' }).ảnh(i, "ụ", true).css({ "box-shadow": "20px 20px #fccf02" }),
                //                                 // ),
                //                             ),
                //                             $('<div>', { id: '', class: ' col-xs-12 col-md-6 plr10 df fdc jcsb', text: '' }).append(
                //                                 $('<div>', { id: '', class: 'fs15 fs11-xs cl1 fwb tac pa15', text: dữLiệu.tên(i, "ụ") }),
                //                                 $('<div>', { id: '', class: '', text: dữLiệu.môTả(i, "ụ") }),
                //                                 $('<a>', { href: dữLiệu.url(i, "ụ"), id: '', class: 'fsi c6 cl1h tar', text: 'Xem thêm' }),
                //                             ),
                //                         );
                //                     }),
                //                 ),
                //             ),
                //         )
                //     })
                // }
            };
            k = k || g["s2"];
            var md5Slide = "a2662fb06842e1acd65bccbe40b85dfa";
            return [
                $('<div>', { id: '', class: 'pf t50 r0 tty z9', text: '' }).append(
                    $('<div>', { id: 's1', class: 'pa15 bgc03 fwb cf bấmĐc bg1h', text: '1' }),
                    $('<div>', { id: 's2', class: 'pa15 bgc03 fwb cf bấmĐc bg1h', text: '2' }),
                ).each(function () {
                    $(this).children("#" + k.s).sửaLớp("bg1").siblings("-bg1")
                }).on("click", ".bấmĐc", function () {
                    var t = $(this),
                        i = t.ID();

                    k = g[i];
                    đổiURL("")
                }),
                $('<div>', { id: '', class: 'pr', text: '' }).append(
                    $('<div>', { id: '', class: 'pa t0 b0 l0 r0 df z9 pen', text: '' }).append(
                        $('<div>', { id: '', class: 'w40 pa25 h1', text: '' }).append(
                            $('<div>', { id: '', class: 'ptb15 pla15 bra5 h1', text: '' }).append(
                                $('<div>', { id: '', class: ' bgrn bgpc bgso wh1 fds0', style: 'background-image: url("/img/trenBia.png")', text: '' }),
                            ),
                        ),
                        $('<div>', { id: '', class: 'w60 h1 df aic jcsc', text: '' }).append(
                            $('<div>', { id: '', class: 'cf ttu fwb fs2 ffr ts02', classMd: "dn", text: 'BIENVENIDO AL DEPARTAMENTO DE ESPAÑOL' }),
                        ),
                    ),
                    $('<div>', { id: '', class: 'bgrn bgpc bgsc w1 pr pb249', text: '' }).xửLý("đốiTượng.tải.a2662fb06842e1acd65bccbe40b85dfa",
                        {
                            d: {
                                thuộcTính: {
                                    559906: 179,
                                    558583: "1"
                                }
                            }
                        }, { cache: true }, function (a) {
                            cl("", a)
                            $(this).cần(md5Slide + "." + a, function () {
                                $(this).sờLai(
                                    a.lọc(md5Slide).map(function (á, à) {
                                        return có("ậ.0", Jd(config(md5Slide + "." + á + ".558579")));
                                    }), function (i, v) {
                                        // cl("LOG__________ slide",a,i);
                                        var dữLiệuSlide = config(md5Slide + "." + a[i]) || {},
                                            link = dữLiệuSlide["558581"] ? dữLiệuSlide["558581"].replace(/https:\/\/hanu.connections.vn/g, "") : "",
                                            môTả = dữLiệuSlide["558580"] || "",
                                            ịChữ = dữLiệuSlide["558659"] || "tac",
                                            vịTrí = (dữLiệuSlide["558582"] || "").split("_").join(",") || "l50,t50,tt",
                                            bo = iA(vịTrí, ["l0,t0", "l50,t0,ttx", "r0,t0"]) ? "brb5" : iA(vịTrí, ["l0,b0", "l50,b0,ttx", "r0,b0"]) ? "brt5" : "bra5",
                                            bgMT = dữLiệuSlide["558711"] || "0",
                                            bgMT = (bgMT == "0" || !bgMT) ? "" : bgMT,
                                            àChữ = bgMT == "bgcf5" ? "c0" : "cf";
                                        $(this).append(
                                            link && $("<a>", { class: "db pa l0 t0 wh1 z5 bấmĐc", href: link }),
                                            môTả && $("<div>", { class: "dn-sm- col-xs-12 col-sm-6 db pai pa15 pa10-xs z3 fs15 fs11-sm", html: môTả }).sửaLớp(vịTrí).sửaLớp(bgMT).sửaLớp(àChữ).sửaLớp(bo).sửaLớp(ịChữ), // ts01
                                        )
                                    }, {
                                    động: "slideInRight",
                                    tựChạy: 3332,
                                    phụ: "dn",
                                    sẵn: true,
                                    cuộn: false,
                                    nét: true,
                                    kín: true,
                                }
                                )
                            })
                        }),
                ),

                // $('<div>', { id: '', class: 'bgrn bgpc bgsc w1 pr pb249', style: 'background-image: url("/img/anhBia.png")', text: '' }).append(
                //     $('<div>', { id: '', class: 'pa t0 b0 l0 r0 df', text: '' }).append(
                //         $('<div>', { id: '', class: 'w40 pa25 h1', text: '' }).append(
                //             $('<div>', { id: '', class: 'ptb15 pla15 bra5 h1', text: '' }).append(
                //                 $('<div>', { id: '', class: ' bgrn bgpc bgso wh1 fds0', style: 'background-image: url("/img/trenBia.png")', text: '' }),
                //             ),
                //         ),
                //         $('<div>', { id: '', class: 'w60 h1 df aic jcsc', text: '' }).append(
                //             $('<div>', { id: '', class: 'cf ttu fwb fs2 ffr ts02', classMd: "dn", text: 'BIENVENIDO AL DEPARTAMENTO DE ESPAÑOL' }),
                //         ),
                //     ),
                // ),
                //Sự kiện  
                k.sựKiện(),
                //Thông báo
                $('<div>', { id: '8926', class: 'bgcf ptb50', text: '', classXs: "-ptb50,ptb25" }).each(function () {
                    var cm = $(this).ID();;
                    $(this).append(
                        $('<div>', { id: '', class: 'tac grid', text: '' }).append(
                            $('<a>', { href: dữLiệu.url(cm, "ụ"), id: '', class: 'plr40 ptb10 mb40 fwb cf fs15 ttu bra5 bgcyd', classXs: '-mb40,mb15,-fs15,-plr40,plr15,-ptb10,ptb3', text: dữLiệu.tên(cm, "ụ") }),
                        ),
                        $('<div>', { id: '', class: 'container  bgrn bgpc bgso', style: 'background-image: url("/img/bando.png")', text: '' }).append(
                            giaoDiện.list({
                                bàiViết: mảng(data.trangChủ[cm]),
                                sốBài: 6,
                                cắtTiêuĐề: 1,
                                cắtDòng: 0,
                            }).sửaLớp("bgcf7")
                        )
                    )
                }),
                //Giao lưu - hợp tác
                k.giaoLưuHợpTác(),
                //Cựu sinh viên
                k.cựuSinhViên(),
            ]
        }
        this.footer = function () {
            return $('<div>', { id: '', class: 'bg1 ptb25', text: '' }).append(
                $('<div>', { id: '', class: 'container', text: '' }).append(
                    $('<div>', { id: '', class: 'df fww jcsb pa10', text: '' }).append(
                        $('<div>', { id: '', class: ' col-xs-12 col-md-8 df aic lh15', text: '' }).append(
                            $('<a>', { href: '/', id: '', class: 'db dfn wh100 bgrn bgpc bgso dn-xs mr10', style: 'background-image: url("/img/logo.jpg")', text: '' }),
                            $('<div>', { id: '', class: 'cf', text: '' }).append(
                                $('<div>', { id: '', class: '', text: 'Trường Đại học Hà Nội - Hanoi University' }),
                                $('<div>', { id: '', class: 'fs12 fwb ttu', text: 'Khoa tiếng Tây Ban Nha' }),
                                $('<div>', { id: '', class: '', text: 'Địa chỉ: Phòng 506, nhà C, Trường Đại học Hà Nội, Km9, Nguyễn Trãi, quận Nam Từ Liêm, Hà Nội, Việt Nam' }),
                                $('<div>', { id: '', class: '', text: 'Điện thoại: 024 3554 1794' }),
                                $('<div>', { id: '', class: '', text: 'Email: taybannha@hanu.edu.vn' }),
                            ),
                        ),
                        $('<div>', { id: '', class: ' col-xs-12 col-md-4 df fww cf', text: '' }).append(
                            data.menuChân.map(function (i) {
                                return $('<a>', { href: dữLiệu.url(i, "ụ"), id: '', class: 'pa10 w50 plr15 ttu fwb bấmĐc tduh', text: dữLiệu.tên(i, "ụ") }).append(
                                    i != 8937 ? "" : $('<c>', { id: '', class: '', text: '' }).append(
                                        $('<a>', { href: "https://facebook.com", id: '', class: '', icon: 'facebook::fs12,bấmĐc,mlr5,cf', text: '' }),
                                        $('<a>', { href: "https://gmail.com", id: '', class: '', icon: 'email::fs12,bấmĐc,mlr5,cf', text: '' }),
                                    ),
                                );
                            })
                        ),
                    ),
                ),
            );
        }
        this.chuyênMục = function (cm, bvTruyềnVào) {
            var cms = khôngGian.chuyênMục.trước(cm),
                cmc;
            cms = cms.slice(iA(chuyênMụcLớn, cms));
            cmc = config("chuyênLực." + cms[0]) || [];
            B.find(".bb2cl1h.menu").sửaLớp("-bb2cl1")
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
                            $.map(data.menuChuyênMục, function (d) {
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
                            T.append(bốCục.hỏiĐáp(cm));
                        } else if (!empty(bvTruyềnVào)) {
                            T.append(
                                bốCục.loạiBàiViết(bvTruyềnVào),
                                // bốCục.tiêuĐiểm(data),
                                bốCục.tinLiênQuan(cm, bvTruyềnVào))
                        } else {
                            T.append(
                                $('<div>', { id: '', class: '', text: '' }).xửLý("bàiViết.tải.1000", { d: { ụ: cm } }, { cache: true, chờ: true }, function (bvs) {
                                    var t = $(this);
                                    bvs = mảng(bvs);
                                    if (empty(bvs)) {
                                        t.append(
                                            $('<div>', { id: '', class: 'pb25 tac', icon: 'search_off::fs15,mr3', text: 'Hiện chuyên mục này chưa có thông tin/bài viết.' })
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
                                                elm: bốCục.thân.find('.phânTrangChuyênMục_' + cm),
                                                sốDòng: 5,
                                                // link: true,
                                                đổiURL: true,
                                                dạngHiểnThị: function (s, t, ố) {
                                                    CẦN.db("bàiViết." + s, function () {
                                                        bốCục.thân.find('.chứaBàiViếtChuyênMục_' + cm).empty().append(
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
                                            T.append(bốCục.tinLiênQuan(cm, bvs));
                                        })
                                    }
                                }),
                                // bốCục.tiêuĐiểm(data),
                            )

                            // t.append(

                            // )
                        }
                    }),
                ),
            )
        }
        this.bàiViết = function (bv) {
            var d = config("bàiViết." + bv),
                cm = mảng($.trùng(khôngGian.chuyênMục.sau(chuyênMụcLớn), Jd(d.ụ), true))[0];
            return bốCục.chuyênMục(cm, bv);
        }
        this.loạiBàiViết = function (i) {
            var d = config("bàiViết." + i) || {},
                div = $('<div>', { id: 'bàiViết', class: 'pb50 plr10 lh1    8', text: '' }).data("bàiViết", i),
                _d = (d.ộ || "").toJSON() || {};
            div.append(
                $('<div>', { id: '', class: 'bb1 bss bcd pb10 mb25', text: '' }).append(
                    $('<div>', { id: '', class: 'fs15 fs11-xs mb5 df fwb jcsb aic', text: dữLiệu.tên(i, "ế") }),
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
                        $('<div>', { id: 'nộiDung', class: 'oh', text: '' }).html(_d.ộ),
                    );
                    break;
                default:
                    div.append(
                        $('<div>', { id: 'nộiDung', class: 'oh' }).append(
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
                                // bvs.map(function (i, d) {
                                //     if (d < 3) {
                                //         d = config("bàiViết." + i);
                                //         return $('<a>', { href: dữLiệu.url(i, "ế"), id: '', class: 'df aic cb pa10', text: '' }).append(
                                //             $('<div>', { id: '', class: 'col-xs-4 col-md-3', text: '' }).append(
                                //                 $('<div>', { id: '', class: 'bgrn bgpc bgsc pb169 ', text: '' }).ảnh(i, "ế", true),
                                //             ),
                                //             $('<div>', { id: '', class: 'col-xs-8 col-md-9 pa10', text: '' }).append(
                                //                 $('<div>', { id: '', class: 'fwb mb4', text: dữLiệu.tên(i, "ế") }).cắtDòng(1),
                                //                 $('<div>', { id: '', class: '', text: dữLiệu.môTả(i, "ế") }).cắtDòng(2),
                                //                 $('<div>', { id: '', class: 'c6 mb5 fs09 tar', icon: 'insert_invitation::fs12', text: iDate(d.ậ || d.ấ, "{j}/{n}/{f}") }),
                                //             ),
                                //         )
                                //     }
                                // })
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
        this.tiêuĐiểm = function (data) {
            var div = $('<div>', { id: '', class: 'pb50', text: '' }).append(
                $('<div>', { id: '', class: 'ttu fs11 cl1h fwb cl1 mb15 plr10', icon: "star_rate::fs12,", text: 'Tin nổi bật' }),
                $('<div>', { id: '', class: '', text: '' }).each(function () {
                    var t = $(this),
                        tiêuĐiểm = [],
                        a = $.mới(Object.keys(data.bàiViết));
                    range(0, 2).map(function (i) {
                        tiêuĐiểm = $.gộp(tiêuĐiểm, a.splice(Rd(0, count(a) - 1), 1)).lọc();
                    });
                    t.append(
                        $('<div>', { id: '', class: 'df fww', text: '' }).append(
                            tiêuĐiểm.map(function (i, d) {
                                d = config("bàiViết." + i);
                                return $('<a>', { href: dữLiệu.url(i, "ế"), id: '', class: 'col-md-4 col-xs-12 pa10', text: '' }).append(
                                    $('<div>', { id: '', class: 'bgrn bgpc bgsc pb169 mb10', text: '' }).ảnh(i, "ế", true),
                                    $('<div>', { id: '', class: 'fwb mb4', text: dữLiệu.tên(i, "ế") }).cắtDòng(1),
                                    $('<div>', { id: '', class: '', text: dữLiệu.môTả(i, "ế") }).cắtDòng(2),
                                    $('<div>', { id: '', class: 'c6 mb5 fs09 tar', icon: 'insert_invitation::fs12', text: iDate(d.ậ || d.ấ, "{j}/{n}/{f}") }),
                                )
                            })
                        ),
                    )

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
        this.thân = $('<div>', { id: '', class: '', text: '' });
    }
    B.empty().append(
        '<div id="fb-root"></div> <script async defer crossorigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v10.0&appId=525943765452875&autoLogAppEvents=1" nonce="sXSbW4Uo"></script>',
        màn("md") ?
            bốCục.menuReponsive() :
            [Trang.header(), bốCục.menu()],
        bốCục.thân,
        bốCục.footer(),
    );
    $.each({
        xửLý: "https://cdn.inevn.com/xửLý",
        0: function () {
            bốCục.thân.empty().append(
                bốCục.trangChủ()
            ),
                cuộn(0, 500);
        },
        c: function (i) {
            bốCục.thân.empty().append(
                bốCục.chuyênMục(i)
            );
            cuộn(0, 500);
        },
        a: function (i) {
            CẦN.db("bàiViết." + i, function () {
                bốCục.thân.empty().append(
                    bốCục.bàiViết(i)
                );
                cuộn(0, 500);
            })
        },
    }, function (á, à) {
        config("url." + á, à);
    });
    vàoURL();
});

