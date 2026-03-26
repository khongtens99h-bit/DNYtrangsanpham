/* --- Lightbox Script --- */
var mgImagesList = [];
                                    var mgCurrentIndex = 0;

                                    // Zoom variables
                                    var mgScale = 1;
                                    var mgPosX = 0;
                                    var mgPosY = 0;
                                    var mgIsDragging = false;
                                    var mgStartX, mgStartY;

                                    // Touch variables for zoom & swipe
                                    var mgInitialDistance = null;
                                    var mgBaseScale = 1;
                                    var mgTouchStartX = null;
                                    var mgTouchStartY = null;
                                    var mgLastTapTime = 0;
                                    
                                    function mgGetDistance(touches) {
                                        var dx = touches[0].clientX - touches[1].clientX;
                                        var dy = touches[0].clientY - touches[1].clientY;
                                        return Math.sqrt(dx * dx + dy * dy);
                                    }

                                    document.addEventListener('DOMContentLoaded', function () {
                                        var thumbItems = document.querySelectorAll('.mg-thumb-item');
                                        thumbItems.forEach(function (el) {
                                            mgImagesList.push(el.getAttribute('data-src'));
                                        });

                                        var lbImg = document.getElementById('mgLbImage');

                                        // Drag events
                                        lbImg.addEventListener('mousedown', function (e) {
                                            e.preventDefault();
                                            if (mgScale <= 1) return;
                                            mgIsDragging = true;
                                            mgStartX = e.clientX - mgPosX;
                                            mgStartY = e.clientY - mgPosY;
                                            this.classList.add('dragging');
                                        });

                                        window.addEventListener('mousemove', function (e) {
                                            if (!mgIsDragging) return;
                                            mgPosX = e.clientX - mgStartX;
                                            mgPosY = e.clientY - mgStartY;
                                            mgUpdateTransform();
                                        });

                                        window.addEventListener('mouseup', function () {
                                            if (mgIsDragging) {
                                                mgIsDragging = false;
                                                lbImg.classList.remove('dragging');
                                            }
                                        });

                                        // Touch events for lightbox
                                        var lbContainer = document.getElementById('mgLightbox');
                                        
                                        lbContainer.addEventListener('touchstart', function(e) {
                                            if (!this.classList.contains('active')) return;
                                            if (e.touches.length === 2) {
                                                mgInitialDistance = mgGetDistance(e.touches);
                                                mgBaseScale = mgScale;
                                                mgIsDragging = false;
                                            } else if (e.touches.length === 1) {
                                                var now = new Date().getTime();
                                                // Double tap to zoom
                                                if (now - mgLastTapTime < 300) {
                                                    if (mgScale > 1) {
                                                        mgScale = 1;
                                                        mgPosX = 0;
                                                        mgPosY = 0;
                                                    } else {
                                                        mgScale = 2; // Zoom in
                                                    }
                                                    mgUpdateTransform();
                                                    mgLastTapTime = 0; 
                                                    return;
                                                }
                                                mgLastTapTime = now;
                                                
                                                mgTouchStartX = e.touches[0].clientX;
                                                mgTouchStartY = e.touches[0].clientY;
                                                
                                                if (mgScale > 1) {
                                                    mgIsDragging = true;
                                                    mgStartX = mgTouchStartX - mgPosX;
                                                    mgStartY = mgTouchStartY - mgPosY;
                                                    lbImg.classList.add('dragging');
                                                }
                                            }
                                        }, { passive: false });
                                        
                                        lbContainer.addEventListener('touchmove', function(e) {
                                            if (!this.classList.contains('active')) return;
                                            if (e.touches.length === 2) {
                                                e.preventDefault();
                                                if (mgInitialDistance) {
                                                    var currentDistance = mgGetDistance(e.touches);
                                                    mgScale = mgBaseScale * (currentDistance / mgInitialDistance);
                                                    if (mgScale < 1) mgScale = 1;
                                                    if (mgScale > 5) mgScale = 5;
                                                    if (mgScale === 1) { mgPosX = 0; mgPosY = 0; }
                                                    mgUpdateTransform();
                                                }
                                            } else if (e.touches.length === 1) {
                                                if (mgScale > 1 && mgIsDragging) {
                                                    e.preventDefault(); 
                                                    mgPosX = e.touches[0].clientX - mgStartX;
                                                    mgPosY = e.touches[0].clientY - mgStartY;
                                                    mgUpdateTransform();
                                                } else if (mgScale === 1 && mgTouchStartX !== null) {
                                                    var currentX = e.touches[0].clientX;
                                                    var currentY = e.touches[0].clientY;
                                                    if (Math.abs(currentX - mgTouchStartX) > Math.abs(currentY - mgTouchStartY)) {
                                                        e.preventDefault(); // Prevents horizontal scroll while swiping to next/prev img
                                                    }
                                                }
                                            }
                                        }, { passive: false });
                                        
                                        lbContainer.addEventListener('touchend', function(e) {
                                            if (!this.classList.contains('active')) return;
                                            if (mgIsDragging) {
                                                mgIsDragging = false;
                                                lbImg.classList.remove('dragging');
                                            }
                                            
                                            // Swipe to next/prev image
                                            if (mgScale === 1 && mgTouchStartX !== null && e.changedTouches.length === 1) {
                                                var diffX = e.changedTouches[0].clientX - mgTouchStartX;
                                                var diffY = e.changedTouches[0].clientY - mgTouchStartY;
                                                if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
                                                    if (diffX > 0) {
                                                        mgPrevImage(null);
                                                    } else {
                                                        mgNextImage(null);
                                                    }
                                                }
                                            }
                                            
                                            if (e.touches.length < 2) mgInitialDistance = null;
                                            if (e.touches.length === 0) {
                                                mgTouchStartX = null;
                                                mgTouchStartY = null;
                                            }
                                        });



                                        // Wheel event for zoom
                                        document.getElementById('mgLightbox').addEventListener('wheel', function (e) {
                                            if (this.classList.contains('active')) {
                                                e.preventDefault(); // prevent page scrolling
                                                var ds = e.deltaY < 0 ? 0.25 : -0.25;
                                                mgZoomBtn(null, ds);
                                            }
                                        }, { passive: false });
                                    });

                                    function mgUpdateTransform() {
                                        var img = document.getElementById('mgLbImage');
                                        if (!mgIsDragging) {
                                            img.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                                        } else {
                                            img.style.transition = 'none';
                                        }

                                        if (mgScale <= 1) {
                                            mgScale = 1;
                                            mgPosX = 0;
                                            mgPosY = 0;
                                        }
                                        img.style.transform = `translate(${mgPosX}px, ${mgPosY}px) scale(${mgScale})`;
                                    }

                                    function mgZoomBtn(e, amount) {
                                        if (e) e.stopPropagation();
                                        mgScale += amount;
                                        if (mgScale > 5) mgScale = 5;
                                        mgUpdateTransform();
                                    }

                                    function mgResetZoomBtn(e) {
                                        if (e) e.stopPropagation();
                                        mgScale = 1;
                                        mgUpdateTransform();
                                    }

                                    function mgSelectImage(index) {
                                        mgCurrentIndex = index;
                                        var mainImg = document.getElementById('mgMainImage');
                                        mainImg.style.opacity = 0.5;
                                        setTimeout(function () {
                                            mainImg.src = mgImagesList[index];
                                            mainImg.style.opacity = 1;
                                        }, 150);

                                        var thumbs = document.querySelectorAll('.mg-thumb-item');
                                        thumbs.forEach(function (t, i) {
                                            if (i === index) t.classList.add('active');
                                            else t.classList.remove('active');
                                        });
                                    }

                                    function mgOpenLightbox() {
                                        var lb = document.getElementById('mgLightbox');
                                        var lbImg = document.getElementById('mgLbImage');
                                        
                                        // Ensure lightbox is a direct child of body to avoid stacking context clipping
                                        if (document.body && lb.parentNode !== document.body) {
                                            document.body.appendChild(lb);
                                        }

                                        lbImg.src = mgImagesList[mgCurrentIndex];
                                        lb.classList.add('active');
                                        document.body.style.overflow = 'hidden';
                                        mgResetZoomBtn(null); // Reset zoom when opening
                                    }

                                    function mgCloseLightbox(e) {
                                        if (e) {
                                            var targetClasses = e.target.classList;
                                            // Close if clicking outside the image, next/prev btns, or zoom controls
                                            if (e.target.id === 'mgLbImage' || targetClasses.contains('mg-nav') || targetClasses.contains('mg-zoom-controls') || targetClasses.contains('mg-zm-btn')) {
                                                return;
                                            }
                                        }
                                        document.getElementById('mgLightbox').classList.remove('active');
                                        document.body.style.overflow = '';
                                        mgResetZoomBtn(null);

                                        // Restore original images list to fix inline image clicks overriding it
                                        var thumbItems = document.querySelectorAll('.mg-thumb-item');
                                        if (thumbItems.length > 0) {
                                            mgImagesList = [];
                                            var activeIndex = 0;
                                            thumbItems.forEach(function (el, idx) {
                                                mgImagesList.push(el.getAttribute('data-src'));
                                                if (el.classList.contains('active')) {
                                                    activeIndex = idx;
                                                }
                                            });
                                            mgCurrentIndex = activeIndex;
                                        }
                                    }

                                    function mgPrevImage(e) {
                                        if (e) e.stopPropagation();
                                        mgCurrentIndex--;
                                        if (mgCurrentIndex < 0) mgCurrentIndex = mgImagesList.length - 1;
                                        document.getElementById('mgLbImage').src = mgImagesList[mgCurrentIndex];
                                        mgSelectImage(mgCurrentIndex);
                                        mgResetZoomBtn(null);
                                    }

                                    function mgNextImage(e) {
                                        if (e) e.stopPropagation();
                                        mgCurrentIndex++;
                                        if (mgCurrentIndex >= mgImagesList.length) mgCurrentIndex = 0;
                                        document.getElementById('mgLbImage').src = mgImagesList[mgCurrentIndex];
                                        mgSelectImage(mgCurrentIndex);
                                        mgResetZoomBtn(null);
                                    }

                                    document.addEventListener('keydown', function (e) {
                                        var lb = document.getElementById('mgLightbox');
                                        if (lb.classList.contains('active')) {
                                            if (e.key === 'Escape') mgCloseLightbox();
                                            if (e.key === 'ArrowLeft') mgPrevImage(null);
                                            if (e.key === 'ArrowRight') mgNextImage(null);
                                            if (e.key === '=' || e.key === '+') mgZoomBtn(null, 0.25);
                                            if (e.key === '-') mgZoomBtn(null, -0.25);
                                        }
                                    });

/* --- Size Tool Script --- */
let szCurrentGender = 'male';

const SZ_DATA_MALE = [
    { code: "XS", w: [0, 50], h: [0, 145], len: 59, chest: 43.5, sleeve: 22 },
    { code: "S", w: [50, 55], h: [145, 155], len: 62.5, chest: 45.5, sleeve: 22.5 },
    { code: "M", w: [55, 60], h: [155, 160], len: 66, chest: 47.5, sleeve: 23 },
    { code: "L", w: [60, 65], h: [155, 165], len: 69, chest: 49.5, sleeve: 23.5 },
    { code: "XL", w: [65, 70], h: [160, 170], len: 72, chest: 51.5, sleeve: 24 },
    { code: "2XL", w: [70, 75], h: [160, 175], len: 74, chest: 53.5, sleeve: 24.5 },
    { code: "3XL", w: [75, 80], h: [165, 180], len: 75.5, chest: 55.5, sleeve: 25 },
    { code: "4XL", w: [80, 85], h: [165, 185], len: 77, chest: 57.5, sleeve: 25.5 },
    { code: "5XL", w: [85, 90], h: [165, 190], len: 78, chest: 59.5, sleeve: 25.5 },
    { code: "6XL", w: [90, 95], h: [165, 195], len: 79, chest: 61.5, sleeve: 25.5 },
    { code: "7XL", w: [95, 100], h: [165, 200], len: 80, chest: 63.5, sleeve: 25.5 },
    { code: "8XL", w: [100, 130], h: [165, 210], len: 81, chest: 65.5, sleeve: 25.5 },
];

const SZ_DATA_FEMALE = [
    { code: "XS", w: [39, 43], h: [149, 153], len: 52, chest: 42, waist: 39, sleeve: 15 },
    { code: "S", w: [43, 46], h: [149, 155], len: 55.5, chest: 44, waist: 41, sleeve: 16 },
    { code: "M", w: [46, 53], h: [149, 159], len: 59, chest: 46, waist: 43, sleeve: 17 },
    { code: "L", w: [53, 57], h: [155, 162], len: 62, chest: 48, waist: 45, sleeve: 18 },
    { code: "XL", w: [57, 63], h: [155, 170], len: 65, chest: 50, waist: 47, sleeve: 19 },
    { code: "XXL", w: [63, 67], h: [162, 173], len: 68, chest: 52, waist: 49, sleeve: 20 },
    { code: "3XL", w: [67, 73], h: [162, 177], len: 71, chest: 54, waist: 51, sleeve: 21 },
    { code: "4XL", w: [73, 77], h: [162, 180], len: 74, chest: 56, waist: 53, sleeve: 22 },
    { code: "5XL", w: [77, 85], h: [162, 185], len: 77, chest: 58, waist: 55, sleeve: 23 },
    { code: "6XL", w: [85, 100], h: [162, 190], len: 80, chest: 60, waist: 57, sleeve: 24 },
];

const SZ_DATA_KIDS = [
    { code: "0", w: [0, 10], age: "1", len: 39.5, chest: 29, sleeve: 11 },
    { code: "1", w: [10, 15], age: "1–2", len: 42, chest: 31, sleeve: 12 },
    { code: "3", w: [15, 20], age: "2–3", len: 44.5, chest: 33, sleeve: 13 },
    { code: "5", w: [20, 25], age: "4–5", len: 47.5, chest: 35, sleeve: 14 },
    { code: "7", w: [25, 30], age: "6–7", len: 50.5, chest: 37, sleeve: 15 },
    { code: "9", w: [30, 35], age: "8–9", len: 53.5, chest: 39, sleeve: 16 },
    { code: "11", w: [35, 40], age: "10–11", len: 56.5, chest: 41, sleeve: 17 },
    { code: "13", w: [40, 45], age: "Trên 11", len: 58.5, chest: 43, sleeve: 18 },
];

function szSetGender(g) {
    szCurrentGender = g;
    document.querySelectorAll('.sz-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('szTabMale').style.background = 'transparent';
    document.getElementById('szTabMale').style.boxShadow = 'none';
    document.getElementById('szTabMale').style.color = '#64748b';
    document.getElementById('szTabFemale').style.background = 'transparent';
    document.getElementById('szTabFemale').style.boxShadow = 'none';
    document.getElementById('szTabFemale').style.color = '#64748b';
    document.getElementById('szTabKids').style.background = 'transparent';
    document.getElementById('szTabKids').style.boxShadow = 'none';
    document.getElementById('szTabKids').style.color = '#64748b';
    
    let btn;
    let titleStr = "Size Nam.";
    if(g === 'male') { btn = document.getElementById('szTabMale'); titleStr = "Size Nam."; document.getElementById('szHeight').parentElement.style.display = 'block'; }
    else if(g === 'female') { btn = document.getElementById('szTabFemale'); titleStr = "Size Nữ."; document.getElementById('szHeight').parentElement.style.display = 'block'; }
    else { btn = document.getElementById('szTabKids'); titleStr = "Size Trẻ em."; document.getElementById('szHeight').parentElement.style.display = 'none'; document.getElementById('szHeight').value = ""; }
    
    if(btn) {
        btn.classList.add('active');
        btn.style.background = '#fff';
        btn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';
        btn.style.color = '#0f172a';
    }
    
    document.getElementById('szGenderTitleDefault').innerText = titleStr;
    document.getElementById('szGenderTitleResult').innerText = titleStr;
    
    // reset suggestion state
    document.getElementById('szDefaultInfo').style.display = 'block';
    document.getElementById('szResult').style.display = 'none';
    document.getElementById('szErr').style.display = 'none';
}

function szParseNum(x) {
    if (x == null) return NaN;
    x = String(x).replace(/[^\d,\.\-]/g, "").replace(",", ".").trim();
    return x === "" ? NaN : Number(x);
}
function szDist(v, [a, b]) { return v < a ? a - v : (v > b ? v - b : 0); }
function szFindNearest(val, key, dir, dataArr) {
    let bestIdx = -1, bestDist = Infinity;
    dataArr.forEach((s, i) => {
        const d = szDist(val, s[key]);
        if (d < bestDist) {
            bestDist = d; bestIdx = i;
        } else if (d === bestDist && dir === 'max') {
            bestIdx = i;
        }
    });
    return bestIdx;
}
function szZStyle(bmi) {
    if (bmi <= 17.5) return { code: 'Z1', label: 'Thư sinh / Slim fit', adj: -2 };
    if (bmi <= 18.8) return { code: 'Z2', label: 'Thư sinh / Slim fit', adj: -2 };
    if (bmi <= 20.2) return { code: 'Z3', label: 'Săn chắc / Athletic', adj: -1 };
    if (bmi <= 21.5) return { code: 'Z4', label: 'Săn chắc / Athletic', adj: 0 };
    if (bmi <= 23.0) return { code: 'Z5', label: 'Thể thao / Body chuẩn', adj: 0 };
    if (bmi <= 25.0) return { code: 'Z6', label: 'Đô con / Dày mình', adj: 0 };
    if (bmi <= 27.5) return { code: 'Z7', label: 'Vạm vỡ / Cơ bắp', adj: 1 };
    if (bmi <= 30.0) return { code: 'Z8', label: 'Vạm vỡ / Cơ bắp', adj: 2 };
    return { code: 'Z9', label: 'Ngoại cỡ / Big Size', adj: 2 };
}
function szSuggest() {
    const w = szParseNum(document.getElementById('szWeight').value);
    const err = document.getElementById('szErr');
    const res = document.getElementById('szResult');
    
    let dataArr = szCurrentGender === 'male' ? SZ_DATA_MALE : (szCurrentGender === 'female' ? SZ_DATA_FEMALE : SZ_DATA_KIDS);

    if (szCurrentGender === 'kids') {
        if (Number.isNaN(w)) {
            err.style.display = 'block'; res.style.display = 'none'; return;
        }
        err.style.display = 'none';
        
        let idxW = szFindNearest(w, 'w', 'max', dataArr);
        if(idxW === -1) {
            err.innerText = "Cân nặng nằm ngoài bảng."; err.style.display = 'block'; return;
        }
        const sizeChosen = dataArr[idxW];
        let logicExplain = "Cân nặng: " + w + "kg. Trẻ em: " + sizeChosen.age + " tuổi.";
        
        let note = "";
        if (sizeChosen.w) {
            if (w < sizeChosen.w[0]) {
                note += `<b style="color:#1e40af; margin-top:4px; display:block;">💡 Bé đang có cân nặng nhỏ hơn chuẩn size ${sizeChosen.code}.</b>`;
            } else if (w > sizeChosen.w[1]) {
                let nextS = dataArr[idxW + 1];
                if (nextS) {
                    note += `<b style="color:#d97706; margin-top:4px; display:block;">💡 Mẹo: Bé đang ở cận trên của size ${sizeChosen.code}. Cân nhắc chọn size ${nextS.code} để bé mặc thoải mái, hoặc có thể mặc được lâu hơn.</b>`;
                }
            }
        }
        
        document.getElementById('szCodeMain').innerText = sizeChosen.code;
        document.getElementById('szCodeCustom').innerText = sizeChosen.code;
        document.getElementById('szShape').innerText = "Trẻ em";
        if(document.getElementById('szBmiLine')) document.getElementById('szBmiLine').style.display = 'none';
        document.getElementById('szLogic').innerHTML = '<i>"' + logicExplain + '"</i>';
        document.getElementById('szNoteWrap').innerHTML = note;
        document.getElementById('szCut').innerText = "Giữ nguyên";
        document.getElementById('szCutLogic').innerText = "Chiều dài áo theo size chọn.";
        
        document.getElementById('szDefaultInfo').style.display = 'none';
        res.style.display = 'block';
        return;
    }

    // Adult Logic (Male/Female)
    const h = szParseNum(document.getElementById('szHeight').value);
    if (Number.isNaN(h) || Number.isNaN(w)) {
        err.style.display = 'block'; res.style.display = 'none'; return;
    }
    err.style.display = 'none';

    let idxH = szFindNearest(h, 'h', 'min', dataArr);
    let idxW = szFindNearest(w, 'w', 'max', dataArr);
    
    if(idxH === -1 || idxW === -1) {
         err.innerText = "Kích thước nằm ngoài bảng."; err.style.display = 'block'; return;
    }

    const bmi = w / ((h / 100) * (h / 100));
    const zStyle = szZStyle(bmi);

    let finalIdx = -1;
    let logicExplain = "";
    const heavyZones = ['Z6', 'Z7', 'Z8', 'Z9'];

    if (heavyZones.includes(zStyle.code)) {
        finalIdx = idxW;
        logicExplain = "BMI " + bmi.toFixed(1) + " (" + zStyle.label + ") → Ưu tiên chọn size theo cân nặng để mặc vừa người.";
    } else {
        finalIdx = idxH + zStyle.adj;
        if (finalIdx < 0) finalIdx = 0;
        if (finalIdx >= dataArr.length) finalIdx = dataArr.length - 1;

        if (zStyle.adj === 0) logicExplain = "BMI " + bmi.toFixed(1) + " (" + zStyle.label + ") → Giữ nguyên size theo chiều cao.";
        else if (zStyle.adj > 0) logicExplain = "BMI " + bmi.toFixed(1) + " (" + zStyle.label + ") → Tăng size so với chiều cao.";
        else logicExplain = "BMI " + bmi.toFixed(1) + " (" + zStyle.label + ") → Giảm size so với chiều cao.";
    }

    const sizeChosen = dataArr[finalIdx];
    let targetLenIndex = idxH;
    if (Math.abs(idxH - finalIdx) >= 2) {
        targetLenIndex = Math.round((finalIdx + idxH) / 2);
    }
    const sizeTargetLen = dataArr[targetLenIndex];

    let cutText = "", cutExplain = "";
    if (sizeChosen.len != null && sizeTargetLen.len != null) {
        const delta = sizeTargetLen.len - sizeChosen.len;
        if (Math.abs(delta) <= 1) {
            cutText = "Giữ nguyên";
            cutExplain = "Chiều dài áo tương đối phù hợp.";
        } else if (delta > 0) {
            cutText = "May thêm ~" + delta.toFixed(1) + "cm";
            cutExplain = "Size " + sizeChosen.code + " ngắn hơn so với chiều cao " + h + "cm.";
        } else {
            cutText = "Cắt lai " + Math.abs(delta).toFixed(1) + "cm";
            if (Math.abs(idxH - finalIdx) >= 2) {
                cutExplain = "Do chênh lệch lớn, nên cắt về chiều dài của size trung gian " + sizeTargetLen.code + " để giữ dáng áo.";
            } else {
                cutExplain = "Size " + sizeChosen.code + " dài hơn so với chiều cao " + h + "cm.";
            }
        }
    } else {
        cutText = "Chưa có thông số"; cutExplain = "";
    }
    
    let note = "";
    if (["XS", "5XL", "6XL", "7XL", "8XL"].includes(sizeChosen.code)) {
        note += `<b style="color:#0f172a; margin-top:4px; display:block;">⚠️ Lưu ý: Size ${sizeChosen.code} vui lòng liên hệ để check lại thông số áo chính xác nhất.</b>`;
    }

    // Handle edge case for discrepancy between height and weight
    if (Math.abs(idxH - idxW) >= 1) {
        note += `<b style="color:#dc2626; margin-top:4px; display:block;">⚠️ Chiều cao và cân nặng đang có sự chênh lệch. Vui lòng chuyển sang mục "Chọn theo thông số áo" và đo trực tiếp áo đang mặc để có kết quả chính xác nhất!</b>`;
    }

    // --- LOGIC VÙNG BIÊN CÂN NẶNG ---
    let boundaryNoteHTML = "";
    if (sizeChosen.w) {
        if (w >= sizeChosen.w[1] - 1.5) {
            let nextS = dataArr[finalIdx + 1] ? dataArr[finalIdx + 1].code : "";
            if (nextS) {
                boundaryNoteHTML = `
                    <div style="margin-top:4px; font-style:normal; background:#eff6ff; border-color:#bfdbfe; color:#1e40af; padding: 8px 12px; border-radius: 6px; border: 1px solid #bfdbfe; font-size:13px; text-align: left;">
                        <b>💡 Mẹo:</b> Cân nặng của bạn đang ở vùng biên trên. Có thể cân nhắc chọn size <b>${nextS}</b> nếu muốn mặc rộng rãi thoải mái.
                    </div>`;
            }
        } else if (w <= sizeChosen.w[0] + 1.5) {
            let prevS = dataArr[finalIdx - 1] ? dataArr[finalIdx - 1].code : "";
            if (prevS && finalIdx > 0) { // To avoid suggesting below the smallest size if not applicable
                boundaryNoteHTML = `
                    <div style="margin-top:4px; font-style:normal; background:#eff6ff; border-color:#bfdbfe; color:#1e40af; padding: 8px 12px; border-radius: 6px; border: 1px solid #bfdbfe; font-size:13px; text-align: left;">
                        <b>💡 Mẹo:</b> Cân nặng của bạn đang ở vùng biên dưới. Có thể cân nhắc chọn size <b>${prevS}</b> nếu muốn mặc ôm hơn.
                    </div>`;
            }
        }
    }

    document.getElementById('szCodeMain').innerText = sizeChosen.code;
    document.getElementById('szCodeCustom').innerText = sizeChosen.code;
    document.getElementById('szShape').innerText = zStyle.label;
    if(document.getElementById('szBmiLine')) document.getElementById('szBmiLine').style.display = 'inline';
    
    document.getElementById('szBmi').innerText = bmi.toFixed(1);
    
    document.getElementById('szLogic').innerHTML = '<i>"' + logicExplain + '"</i>';
    document.getElementById('szNoteWrap').innerHTML = boundaryNoteHTML + note;
    
    document.getElementById('szCut').innerText = cutText;
    document.getElementById('szCutLogic').innerText = cutExplain;

    document.getElementById('szDefaultInfo').style.display = 'none';
    res.style.display = 'block';
}

                                        document.querySelectorAll('#szHeight, #szWeight').forEach(el => {
                                            el.addEventListener('keydown', e => {
                                                if (e.key === "Enter") { e.preventDefault(); szSuggest(); }
                                            });
                                        });

document.addEventListener('DOMContentLoaded', function() {
    var sizeWidget = document.querySelector('.size-suggestion-widget');
    var desktopContainer = document.getElementById('desktop-size-tool-container');
    var mobileContainer = document.getElementById('mobile-size-tool-container');
    
    if (sizeWidget && desktopContainer && mobileContainer) {
        function arrangeSizeTool() {
            if (window.innerWidth <= 991) {
                if (sizeWidget.parentNode !== mobileContainer) {
                    mobileContainer.appendChild(sizeWidget);
                }
            } else {
                if (sizeWidget.parentNode !== desktopContainer) {
                    desktopContainer.appendChild(sizeWidget);
                }
            }
        }
        
        arrangeSizeTool();
        window.addEventListener('resize', arrangeSizeTool);
    }
});