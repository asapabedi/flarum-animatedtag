System.register('davis/socialprofile/main', ['flarum/extend', 'flarum/components/CommentPost'], function (_export) {
    'use strict';

    var extend, CommentPost;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsCommentPost) {
            CommentPost = _flarumComponentsCommentPost['default'];
        }],
        execute: function () {

            app.initializers.add('davis-animatedtag', function () {
                var rendered = false;
                extend(CommentPost.prototype, 'config', function () {
                    renderani();
                });

                function renderani() {
                    if (!rendered) {
                        var width, height, largeHeader, canvas, ctx, triangles, target, animateHeader;
                        var cltp;
                        var cl;
                        var trifreq;
                        var trinum;
                        var tempclr;
                        var tpcolor;
                        var colors;
                        var i;

                        (function () {
                            var initHeader = function initHeader() {
                                width = window.innerWidth;
                                height = window.innerHeight / 5;
                                target = { x: 0, y: height };

                                largeHeader = document.getElementsByClassName("DiscussionHero--colored")[0];
                                largeHeader.style.height = height + 'px';

                                var canvastemp = document.createElement('canvas');
                                canvastemp.setAttribute("id", "tag-canvas");
                                if (document.getElementById('tag-canvas')) {} else {
                                    largeHeader.insertBefore(canvastemp, largeHeader.firstChild);
                                }

                                canvas = document.getElementById('tag-canvas');
                                canvas.width = width;
                                canvas.height = height;
                                ctx = canvas.getContext('2d');

                                // create particles
                                triangles = [];
                                for (var x = 0; x < trinum; x++) {
                                    addTriangle(x * trifreq);
                                }
                            };

                            var addTriangle = function addTriangle(delay) {
                                setTimeout(function () {
                                    var t = new Triangle();
                                    triangles.push(t);
                                    tweenTriangle(t);
                                }, delay);
                            };

                            var initAnimation = function initAnimation() {
                                animate();
                            };

                            var tweenTriangle = function tweenTriangle(tri) {
                                var t = Math.random() * (2 * Math.PI);
                                var x = (200 + Math.random() * 100) * Math.cos(t) + width * 0.5;
                                var y = (200 + Math.random() * 100) * Math.sin(t) + height * 0.5 - 20;
                                var time = 4 + 3 * Math.random();

                                TweenLite.to(tri.pos, time, { x: x,
                                    y: y, ease: Circ.easeOut,
                                    onComplete: function onComplete() {
                                        tri.init();
                                        tweenTriangle(tri);
                                    } });
                            }

                            // Event handling
                            ;

                            var addListeners = function addListeners() {
                                window.addEventListener('scroll', scrollCheck);
                                window.addEventListener('resize', resize);
                            };

                            var scrollCheck = function scrollCheck() {
                                if (document.body.scrollTop > height) animateHeader = false;else animateHeader = true;
                            };

                            var resize = function resize() {
                                width = window.innerWidth;
                                height = window.innerHeight;
                                largeHeader.style.height = height + 'px';
                                canvas.width = width;
                                canvas.height = height;
                            };

                            var animate = function animate() {
                                if (animateHeader) {
                                    ctx.clearRect(0, 0, width, height);
                                    for (var i in triangles) {
                                        triangles[i].draw();
                                    }
                                }
                                requestAnimationFrame(animate);
                            }

                            // Canvas manipulation
                            ;

                            var Triangle = function Triangle() {
                                var _this = this;

                                // constructor
                                (function () {
                                    _this.coords = [{}, {}, {}];
                                    _this.pos = {};
                                    init();
                                })();

                                function init() {
                                    _this.pos.x = width * 0.5;
                                    _this.pos.y = height * 0.5 - 20;
                                    _this.coords[0].x = -10 + Math.random() * 40;
                                    _this.coords[0].y = -10 + Math.random() * 40;
                                    _this.coords[1].x = -10 + Math.random() * 40;
                                    _this.coords[1].y = -10 + Math.random() * 40;
                                    _this.coords[2].x = -10 + Math.random() * 40;
                                    _this.coords[2].y = -10 + Math.random() * 40;
                                    _this.scale = 0.1 + Math.random() * 0.3;
                                    _this.color = colors[Math.floor(Math.random() * colors.length)];
                                    setTimeout(function () {
                                        _this.alpha = 0.8;
                                    }, 10);
                                }

                                this.draw = function () {
                                    if (_this.alpha >= 0.005) _this.alpha -= 0.005;else _this.alpha = 0;
                                    ctx.beginPath();
                                    ctx.moveTo(_this.coords[0].x + _this.pos.x, _this.coords[0].y + _this.pos.y);
                                    ctx.lineTo(_this.coords[1].x + _this.pos.x, _this.coords[1].y + _this.pos.y);
                                    ctx.lineTo(_this.coords[2].x + _this.pos.x, _this.coords[2].y + _this.pos.y);
                                    ctx.closePath();
                                    ctx.fillStyle = 'rgba(' + _this.color + ',' + _this.alpha + ')';
                                    ctx.fill();
                                };

                                this.init = init;
                            };

                            animateHeader = true;
                            cltp = document.getElementsByClassName("Hero")[0].style['background-color'];

                            cltp = cltp.substring(4, cltp.length - 1).replace(/ /g, '').split(',');
                            cltp[0] = Number(cltp[0]);
                            cltp[1] = Number(cltp[1]);
                            cltp[2] = Number(cltp[2]);
                            cl = $ui.color.rgb2hex(cltp);
                            trifreq = 10;
                            //Bigger is slower rel of shapes
                            trinum = 480;
                            //org 480

                            tempclr = $ui.color.tetradic(cl);

                            tempclr.splice(0, 1); //Remove background color from colors
                            tpcolor = {};
                            colors = [];
                            i = 0;

                            while (i < 3) {
                                tpcolor[i] = $ui.color.hex2rgb(tempclr[i]);
                                colors[i] = tpcolor[i][0] + "," + tpcolor[i][1] + "," + tpcolor[i][2];
                                i++;
                            }
                            // Main
                            initHeader();
                            addListeners();
                            initAnimation();

                            rendered = true;
                        })();
                    }
                }
            });
        }
    };
});