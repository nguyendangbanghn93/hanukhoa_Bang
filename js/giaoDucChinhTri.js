CM.cấuHình = {
    body: $("body").sửaLớp("bgcfx"),//.css("background", "#f5dada3b"),
    thân: $('<div>', { id: '', class: '', text: '' }),
    khoa: "Khoa Giáo dục Chính Trị",
    chuỗiCfg: "web.8984",
    chuyênMục: "8984",
    trangChủ: {
        "8986": { /*/sựkiện*/
            sốBài: 6,
            điềuKiện: { ụ: "8986++" }
        },
        "8987": { /*/thôngBáo*/
            sốBài: 4,
            điềuKiện: { ụ: "8987++" }
        },
    },
    list: {
        menuTrên: [
            "Trang chủ",
            "8985",// "Giới thiệu"
            "8986",// "Tin tức - Sự kiện"
            "8987",// "Thông báo"
            "8988",// "Đào tạo"
            "8989",// "Nghiên cứu khoa học"
            "8990",// "Tư vấn học tập"
            "8991",// "Nhịp sống khoa"
            "8992",// "Tài nguyên"
            "8993",// "Liên hệ"
        ],
        menuChân: [
            "8985",// "Giới thiệu"
            "8990",// "Tư vấn học tập"
            "8988",// "Đào tạo"
            "8992",// "Tài nguyên"
            "8998",// Tuyển sinh
            "8993",// "Liên hệ"
        ],
        menuChuyênMục: [
            { chuyênMục: "8999", icon: "school" },
            { chuyênMục: "9000", icon: "group_add" },
            { chuyênMục: "9001", icon: "business_center" },
            { chuyênMục: "9003", icon: "connect_without_contact" },
            { chuyênMục: "8989", icon: "track_changes" }
        ]
    },
    hỏiĐáp: "7369",
}
CM.cache(function (obj) {
    var B = CM.cấuHình;
    // B.list.menuTrên = [

    //     "8985",// "Giới thiệu"
    //     "8986",// "Tin tức - Sự kiện"
    //     "8987",// "Thông báo"
    //     "8988",// "Đào tạo"
    //     "8989",// "Nghiên cứu khoa học"
    //     "8990",// "Tư vấn học tập"
    //     "8991",// "Nhịp sống khoa"
    //     "8992",// "Tài nguyên"
    //     "8993",// "Liên hệ"
    // ];
    // B.list.menuChân = [
    //     "8985",// "Giới thiệu"
    //     "8990",// "Tư vấn học tập"
    //     "8988",// "Đào tạo"
    //     "8992",// "Tài nguyên"
    //     "8997",// Tuyển sinh
    //     "8993",// "Liên hệ"
    // ];
    Trang.menu = function () {
        var menu = $(), vịTrí = 0;
        var div = màn("xs") ? [$('<div>', { id: '', class: 'ps t0 l0 w1 z1 df jcsb bg1 plr10 ptb5', classXs: '', text: '' }).append(
            $('<div>', { id: '', class: 'df aic', text: '' }).append(
                $('<a>', { href: "/", id: '', class: 'db bgrn bgpc bgsc wh30 logoMenu bra50', text: '' }).ảnh(ud, "ụ", true),
                $('<div>', { id: '', class: 'ml5 cf', text: '' }).append(
                    $('<div>', { id: '', class: 'ttu fwb', text: B.khoa }),
                    $('<div>', { id: '', class: 'fs09', text: 'Trường Đại học Hà Nội' }),
                ),
            ),
            $('<div>', { id: '', class: 'df aic', text: '' }).append(
                $('<a>', { href: '/', id: '', class: 'mr5 db', icon: 'home::fs15,cf', text: '' }),
                Trang.tìmXs(),
                $('<div>', { id: '', class: 'cf', icon: 'menu::fs14,bấmĐc,mr5', text: '' }).click(function () {
                    menu.width(300)
                }),
            )
        ), menu = $('<div>', { id: '', class: 'dn-xs- pf pa r0 t0 b0 bgcf z9 bóng ta5 oh', text: '' }).width(0).append(
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
                    B.list.menuTrên.map(function (i) {
                        return $('<a>', { class: 'pa10 bb1 bsda bcd db fwb crd', href: dữLiệu.url(i, "ụ") || "/", text: dữLiệu.tên(i, "ụ", "Trang chủ") }).click(function () { menu.width(0) })
                    })
                ),
            ),
        )] :
            //!Trên máy tính
            [
                $('<div>', { id: '', class: 'dn-xs bgcf z11 pr', text: '' }).append(
                    $('<a>', { href: '/', id: '', class: 'container grid pa10 db chứaLogoMenu', text: '' }).append(
                        $('<div>', { id: '', class: 'bgrn bgpc bgsc wh40 logoMenu', text: '' }).ảnh(ud, "ụ", true),
                        $('<div>', { id: '', class: 'ml15 ttu fs12 cl1 ', text: B.khoa }),
                    ),
                ),
                $('<div>', { id: '', class: 'dn-xs ps t0 l0 w1 bgcf z9 ta5 ptb15 bóng', text: '' }).append(
                    $('<div>', { id: '', class: 'container chứaMenu df jcsc', text: '' }).append(
                        B.list.menuTrên.map(function (i, d) {
                            return $('<a>', { href: dữLiệu.url(i, "ụ") || "/", id: '', class: 'plr15 fl1 fwb cl1 c0h menu ' + (d != count(B.list.menuTrên) - 1 ? " br2 bss bc1" : ""), text: dữLiệu.tên(i, "ụ", "Trang chủ") })
                        })
                    ),
                ).chờ(function () {
                    menu = $(this);
                }, 123),


            ];
        return div;
    };
    
    Trang.trangChủ = function () {
        var g = new function () {
            this.baner = function () {
                return $('<div>', { id: '', class: 'pb249 bgrn bgsc bgpc col-xs-12', text: '' }).ảnh(B.chuyênMục, "ụ", true).chờ(function () { $(this).xờLai("/slidebanner_18398.json") }, 123)
            }
            this.tinTức = function (cm, c) {
                return $('<div>', { id: '', class: c, text: '' }).append(
                    $('<div>', { id: '', class: 'bgcf h1', text: '' }).append(
                        $('<div>', { id: '', class: 'pa10 grid', classXs: "tac", text: '' }).append(
                            $('<a>', { href: dữLiệu.url(cm, "ụ"), class: 'fs11 fwb ttu ptb5 plr40 bra25 ptb3-xs cf bgr1 dib fs1-xs', classXs: '-ptb5,-plr40,plr10', text: dữLiệu.tên(cm, "ụ") }),
                        ),
                        $('<div>', { id: '', class: 'df fww', text: '' }).append(
                            màn("xs") ?
                                giaoDiện.danhSách({
                                    bàiViết: obj.trangChủ[cm],
                                    sốBài: 3,
                                    cắtTiêuĐề: màn("xs") ? 1 : 2,
                                    cắtDòng: màn("xs") ? 2 : 3,
                                })
                                :
                                obj.trangChủ[cm].map(function (i, d) {
                                    if (d < 3) {
                                        return $('<a>', { href: dữLiệu.url(i, "ế"), id: '', class: 'col-xs-12 col-md-4 pa10', text: '' }).append(
                                            $('<div>', { id: '', class: 'sc12hc', text: '' }).append(
                                                $('<div>', { id: '', class: 'bgrn bgpc bgsc pb43', text: '' }).ảnh(i, "ế", true),
                                            ),
                                            $('<div>', { id: '', class: 'plr15 tty', text: '' }).append(
                                                $('<div>', { id: '', class: 'pa10 bgcf fwb cl1 fs12 tac fs1-xs', text: dữLiệu.tên(i, "ế") }).cắtD(2),
                                            ),
                                        );
                                    } else if (d >= 3 && d < 5) {
                                        d = config("bàiViết." + i);
                                        return $('<a>', { href: dữLiệu.url(i, "ế"), id: '', class: 'col-xs-12 pa10 bb1 bsda bcd bg1o1h', text: '' }).append(
                                            $('<div>', { id: '', class: 'fwb fs11', text: dữLiệu.tên(i, "ế") }).cắtD(1),
                                            $('<div>', { id: '', class: 'dn-xs df jcsb', text: '' }).append(
                                                $('<div>', { id: '', class: '', text: 'Chính quy' }),
                                                $('<div>', { id: '', class: 'c6 fs09 dfn', icon: 'insert_invitation::fs12', text: iDate(d.ậ || d.ấ, "{j}/{n}/{f}") }),
                                            ),
                                        )
                                    }
                                })
                        ),
                    ),
                )
            }
            this.thôngBáo = function (cm, c) {
                return $('<div>', { id: '', class: c, text: '' }).append(
                    $('<div>', { id: '', class: 'bgcf h1 bgrn bgpc bgso', style: 'background-image:url("./img/GDCT/bando1.png")', text: '' }).append(
                        $('<div>', { id: '', class: 'pa10 grid', classXs: "tac", text: '' }).append(
                            $('<a>', { href: dữLiệu.url(cm, "ụ"), class: 'fs11 fwb ttu ptb5 plr40 bra25 ptb3-xs cf bgr1 dib fs1-xs', classXs: '-ptb5,-plr40,plr10', text: dữLiệu.tên(cm, "ụ") }),
                        ),
                        giaoDiện.list({
                            bàiViết: mảng(obj.trangChủ[cm]),
                            sốBài: 6,
                            cắtTiêuĐề: 1,
                            cắtDòng: 0,
                        }).sửaLớp("pt15")
                    ),
                )
            }
            this.đàoTạo = function (cm, c) {
                return $('<div>', { id: '', class: c, text: '' }).append(
                    $('<div>', { id: '', class: 'bgcf h1', text: '' }).append(
                        $('<div>', { id: '', class: 'pa10 grid', classXs: "tac", text: '' }).append(
                            $('<a>', { href: dữLiệu.url(cm, "ụ"), class: 'fs11 fwb ttu ptb5 plr40 bra25 ptb3-xs cf bgr1 dib fs1-xs', classXs: '-ptb5,-plr40,plr10', text: dữLiệu.tên(cm, "ụ") }),
                        ),
                        $('<div>', { id: '', class: 'pa10 plr25', text: '' }).append(
                            $('<a>', { href: dữLiệu.url(cm, "ụ"), id: '', class: 'db bgrn bgpc bgsc pb249 truyCập', text: '' }).ảnh(cm, "ụ", true),
                        )
                    ),
                )
            }
            this.bộMôn = function (cm, c) {
                return $('<div>', { id: '', class: c, text: '' }).append(
                    $('<div>', { id: '', class: 'bgcf h1', text: '' }).append(
                        $('<div>', { id: '', class: 'pa10 grid', classXs: "tac", text: '' }).append(
                            $('<a>', { href: dữLiệu.url(cm, "ụ"), class: 'fs11 fwb ttu ptb5 plr40 bra25 ptb3-xs cf bgr1 dib fs1-xs', classXs: '-ptb5,-plr40,plr10', text: dữLiệu.tên(cm, "ụ") }),
                        ),
                        $('<div>', { id: '', class: 'flex', text: '' }).append(
                            mảng(config("chuyênLực." + cm)).map(function (i, d) {
                                return $('<a>', { href: dữLiệu.url(i, "ụ"), class: 'db col-xs-12 col-md-4 pa10', text: '' }).append(
                                    $('<div>', { id: '', class: 'pb43 bgrn bgpc bgsc pr truyCập ảnhBộMôn', }).ảnh(i, "ụ", true).append(
                                        $.icon('bookmark::fs2,cl1,fwb,pa,t0,r0,mr15,lh09')
                                    ),
                                    $('<div>', { id: '', class: 'bgce tac fs12 cl1 fwb pt10 pb25 plr10 brbr5 brbl5 tduh', text: dữLiệu.tên(i, "ụ") }).cắtD(2),
                                )
                            })
                        ),
                    ),
                )
            }
            this.tưVấnHọcTập = function (cm, c) {
                return $('<div>', { id: '', class: c, text: '' }).append(
                    $('<div>', { id: '', class: 'bgcf h1 plr15', classXs: '-plr15', text: '' }).append(
                        $('<div>', { id: '', class: 'tac pa10 grid', text: '' }).append(
                            $('<a>', { href: dữLiệu.url(cm, "ụ"), class: 'fs11 fwb ttu ptb5 plr40 bra25 ptb3-xs cf bgr1 dib fs1-xs db', classXs: '-ptb5,-plr40,plr10', text: dữLiệu.tên(cm, "ụ") }),
                        ),
                        $('<div>', { id: '', class: 'pa10', text: '' }).append(
                            $('<a>', { href: dữLiệu.url(cm, "ụ"), id: '', class: 'db bgrn bgpc bgsc pb43 truyCập', text: '' }).ảnh(cm, "ụ", true),
                        )
                    ),
                )
            }
            this.NghiênCứuKhoaHọc = function (cm, c) {
                return $('<div>', { id: '', class: c, text: '' }).append(
                    $('<div>', { id: '', class: 'bgcf h1 plr15', classXs: '-plr15', text: '' }).append(
                        $('<div>', { id: '', class: 'tac pa10 grid', text: '' }).append(
                            $('<a>', { href: dữLiệu.url(cm, "ụ"), class: 'fs11 fwb ttu ptb5 plr40 bra25 ptb3-xs cf bgr1 dib fs1-xs db', classXs: '-ptb5,-plr40,plr10', text: dữLiệu.tên(cm, "ụ") }),
                        ),
                        $('<div>', { id: '', class: 'pa10', text: '' }).append(
                            $('<a>', { href: dữLiệu.url(cm, "ụ"), id: '', class: 'db bgrn bgpc bgsc pb43 truyCập', text: '' }).ảnh(cm, "ụ", true),
                        )
                    ),
                )
            }
            this.nhịpSốngKhoa = function (cm, c) {
                return $('<div>', { id: '', class: c, text: '' }).append(
                    $('<div>', { id: '', class: 'bgcf h1 df fdc plr15', classXs: '-plr15', text: '' }).append(
                        $('<div>', { id: '', class: 'tac pa10 grid', text: '' }).append(
                            $('<a>', { href: dữLiệu.url(cm, "ụ"), class: 'fs11 fwb ttu ptb5 plr40 bra25 ptb3-xs cf bgr1 dib fs1-xs db', classXs: '-ptb5,-plr40,plr10', text: dữLiệu.tên(cm, "ụ") }),
                        ),
                        $('<div>', { id: '', class: 'pa10 fl1', text: '' }).append(
                            $('<div>', { id: '', class: 'db bgrn bgpc bgsc wh1', classXs: 'pb43', text: '' }).chờ(function () {
                                var t = $(this);
                                t.ảnh(cm, "ụ", true);
                                xửLý("bàiViết.tải.3", { d: { ụ: cm } }, { delay: 1000, cache: true }, function (bvs) {
                                    CẦN.db("bàiViết." + bvs, function () {
                                        t.sờLai(mảng(bvs).map(function (i) {
                                            return dữLiệu.ảnh(i, "ế")
                                        }), {
                                            động: "slideInRight",
                                            tựChạy: 3332,
                                            phụ: "dn",
                                            sẵn: true,
                                            cuộn: false,
                                            // nét: true,
                                            kín: true,
                                        })
                                    })
                                })
                            }, 123)
                        ),
                    ),
                )
            }
        };
        return $('<div>', { id: '', class: 'df fdc', text: '' }).append(
            g.baner(),
            $('<div>', { id: '', class: 'container df fww pb50', text: '' }).append(
                màn("xs") ? [
                    g.tinTức(8986, 'col-xs-12 col-md-8 pa5'),
                    g.thôngBáo(8987, 'col-xs-12 col-md-8 pa5'),
                    g.tưVấnHọcTập(8990, 'col-xs-12 col-md-4 pa5'),
                    g.NghiênCứuKhoaHọc(8989, 'col-xs-12 col-md-4 pa5'),
                    g.bộMôn(9038, 'col-xs-12 col-md-8 pa5'),
                    g.nhịpSốngKhoa(8991, 'col-xs-12 col-md-4 pa5'),
                ] : [
                    g.tinTức(8986, 'col-xs-12 col-md-8 pa5'),
                    g.tưVấnHọcTập(8990, 'col-xs-12 col-md-4 pa5'),
                    g.thôngBáo(8987, 'col-xs-12 col-md-8 pa5'),
                    g.NghiênCứuKhoaHọc(8989, 'col-xs-12 col-md-4 pa5'),
                    g.bộMôn(9038, 'col-xs-12 col-md-8 pa5'),
                    g.nhịpSốngKhoa(8991, 'col-xs-12 col-md-4 pa5'),
                ]

            ),
        )
    }
    B.body.empty().append(
        Trang.library(),
        Trang.header(),
        Trang.menu(),
        B.thân.empty().append(
            Trang.trangChủ(),
        ),
        Trang.footer({
            tênTrường: "Trường Đại học Hà Nội - Hanoi University",
            địaChỉ: 'Địa chỉ: Phòng 202 nhà C, Trường Đại học Hà Nội, Km9, đường Nguyễn Trãi, quận Nam Từ Liêm, Hà Nội, Việt Nam',
            điệnThoại: "Điện thoại: 024.38544338",
            email: 'Email: giaoducchinhtri@hanu.edu.vn',
            facebook: "https://facebook.com",
            linkEmail:"giaoducchinhtri@hanu.edu.vn",
        }),
    );
    $.each({
        xửLý: "https://cdn.inevn.com/xửLý",
        0: function () {
            B.thân.empty().append(
                Trang.trangChủ(),
            ),
                cuộn(0, 500);
        },
        c: function (i) {
            B.thân.empty().append(
                Trang.chuyênMục(i)
            );
            cuộn(0, 500);
        },
        a: function (i) {
            CẦN.db("bàiViết." + i, function () {
                B.thân.empty().empty().append(
                    Trang.bàiViết(i)
                );
                cuộn(0, 500);
            })
        },
    }, function (á, à) {
        config("url." + á, à);
    });
    vàoURL();
})