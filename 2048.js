let container = [], score = 0, color = ["#faec9f", "#beab3e", "#c77a5c", "#d6511c", "#38ec65", "#ec38dd", "#38c8ec", "#3eec38", "#e221fc"]
//颜色判断
function testnumber(data) {
    let w = 0
    while (data / 2 > 1) {
        w++
        data /= 2
    }
    return w
}
//开始
function started() {
    let box = document.getElementById("box"), start = document.getElementById("start")
    container[0] = {}
    container[0].Row = 1
    container[0].Col = 1
    container[0].id = "container0"
    let atom = create()
    atom.style.top = "0px"
    atom.style.left = "0px"
    container[0].body = atom
    box.appendChild(container[0].body)
    start.onclick = ""
    play()
}
//重置
function Reseted() {
    let box = document.getElementById("box"), start = document.getElementById("start"), thescore = document.getElementById("thescore")
    if (box.children.length > 16) {
        for (let index = box.children.length - 1; index > 15; index--) {
            box.children[index].parentNode.removeChild(box.children[index])
        }
    }
    container = []
    score = 0
    thescore.innerHTML = score
    window.onkeydown = ""
    start.onclick = started
}
//创造单位
function create() {
    let created = document.createElement("div"), id = `container${container.length - 1}`
    created.id = id
    created.style.width = "19px"
    created.style.height = "19px"
    created.style.backgroundColor = "#eff5b9"
    created.style.borderRadius = "2px"
    // created.style.boxShadow = "1px 1px 2px black"
    created.style.position = "absolute"
    created.style.textAlign = "center"
    created.style.lineHeight = "49px"
    created.style.transition = "width 0.1s,height 0.1s,left 0.5s,top 0.5s"
    setTimeout(() => {
        created.style.width = "49px"
        created.style.height = "49px"
    }, 0);
    created.style.zIndex = 99
    created.innerHTML = Math.floor(Math.random() * 2) == 0 ? "2" : "4"
    created.style.backgroundColor = color[testnumber(Number(created.innerHTML)) % 9 - 1]
    return created
}
//界面初始化
function huahua() {
    let box = document.createElement("div"), bd = document.getElementById("body"), kzt = document.createElement("div")
    box.id = "box"
    box.style.margin = "100px auto"
    box.style.position = "relative"
    box.style.marginBottom = "0px"
    box.style.backgroundColor = "#f7f4e0"
    box.style.width = "200px"
    box.style.height = "200px"
    box.style.display = "flex"
    box.style.flexFlow = "row wrap"
    box.style.padding = "1px 0px 0px 1px"
    bd.appendChild(box)
    for (let index = 0; index < 16; index++) {
        let item = document.createElement("div")
        item.id = `item${index}`
        item.style.width = "49px"
        item.style.height = "49px"
        item.style.margin = "0px 1px 0px 0px"
        item.style.backgroundColor = "#ffffff"
        item.style.borderRadius = "2px"
        item.style.boxShadow = "1px 1px 2px black"
        box.appendChild(item)
    }
    kzt.id = "kzt"
    kzt.style.width = "200px"
    kzt.style.height = "50px"
    kzt.style.margin = "0px auto"
    kzt.style.backgroundColor = "#f7f4e0"
    kzt.style.display = "flex"
    kzt.style.flexDirection = "row"
    kzt.style.justifyContent = "space-between"
    let start = document.createElement("div"), Reset = document.createElement("div"), thescore = document.createElement("div")
    start.id = "start"
    Reset.id = "Reset"
    thescore.id = "thescore"
    start.innerHTML = "开始"
    start.onclick = started
    thescore.innerHTML = score
    Reset.innerHTML = "重置"
    Reset.onclick = Reseted
    kzt.appendChild(Reset)
    kzt.appendChild(thescore)
    kzt.appendChild(start)
    for (let i = 0; i < 3; i++) {
        kzt.children[i].style.width = "50px"
        if (i == 1) {
            kzt.children[i].style.width = "70px"
        }
        kzt.children[i].style.height = "50px"
        kzt.children[i].style.borderRadius = "5px"
        kzt.children[i].style.backgroundColor = "#f8eda4"
        kzt.children[i].style.textAlign = "center"
        kzt.children[i].style.lineHeight = "50px"
    }
    bd.appendChild(kzt)
}
//监听键盘
function play() {
    window.onkeydown = (ele) => {
        switch (ele.key) {
            case "S":
            case "s":
                luoji("down")
                break
            case "A":
            case "a":
                luoji("left")
                break
            case "W":
            case "w":
                luoji("up")
                break
            case "D":
            case "d":
                luoji("right")
                break
        }
    }
}
//逻辑判断
function luoji(str) {
    window.onkeydown = ""
    switch (str) {
        case "up":
            Calculation("up")
            break;
        case "down":
            Calculation("down")
            break;
        case "right":
            Calculation("right")
            break;
        case "left":
            Calculation("left")
            break;
    }
    if (container.filter(res => {
        return res.id != undefined
    }).length >= 16) {
        alert("游戏结束！得分为" + score)
        Reseted()
        return
    }
    setTimeout(() => {
        newele()
        play()
    }, 500);
}
//合并计算
function Calculation(str) {
    let box = document.getElementById("box"), seesaw = [], about = []
    //对象属性排序
    function compare(property) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    }
    //seesaw Y轴分成四列，根据Col排序，about X轴分成四列，根据Row排序
    for (let index = 0; index < 4; index++) {
        seesaw[index] = container.filter((res) => {
            return res.Row == index + 1
        })
        seesaw[index] = seesaw[index].sort(compare("Col"))
        about[index] = container.filter((res) => {
            return res.Col == index + 1
        })
        about[index] = about[index].sort(compare("Row"))
    }
    // 
    switch (str) {//先计算，再位移
        case "up":
            seesaw.forEach((res, index) => {
                res.forEach((ele, i) => {
                    if (i > 0 && res[i - 1].body.innerHTML == res[i].body.innerHTML) {
                        let Previous = document.getElementById(`${res[i].id}`), thescore = document.getElementById("thescore")
                        score += Number(Previous.innerHTML)
                        Previous.innerHTML = Number(Previous.innerHTML) * 2
                        Previous.style.backgroundColor = color[testnumber(Number(Previous.innerHTML)) % 9 - 1]
                        thescore.innerHTML = score
                        let del = document.getElementById(seesaw[index][i - 1].id)
                        del.remove()
                        container.forEach((dd, j) => {
                            if (dd.id == seesaw[index][i - 1].id) {
                                container[j] = {}
                            }
                        })
                        seesaw[index].splice(i - 1, 1)
                    }
                })
            })
            seesaw.forEach((res, index) => {
                res.forEach((ele, i) => {
                    if (seesaw[index][i].Col > (i + 1)) {
                        let ww = document.getElementById(`${ele.id}`)
                        ww.style.top = i * 50 + "px"
                        container.forEach((chang, ind) => {
                            if (ele.id == chang.id) {
                                container[ind].Col = i + 1
                            }
                        })
                    }
                })
            })
            break;
        case "down":
            seesaw.forEach((res, index) => {
                let test = []
                for (let i = res.length - 1; i >= 0; i--) {
                    test[i] = false
                    if (i < res.length - 1 && res[i + 1].body.innerHTML == res[i].body.innerHTML && test[i + 1] != true) {
                        let Previous = document.getElementById(`${res[i].id}`), thescore = document.getElementById("thescore")
                        test[i] = true
                        score += Number(Previous.innerHTML)
                        Previous.innerHTML = Number(Previous.innerHTML) * 2
                        Previous.style.backgroundColor = color[testnumber(Number(Previous.innerHTML)) % 9 - 1]
                        thescore.innerHTML = score
                        let del = document.getElementById(seesaw[index][i + 1].id)
                        del.remove()
                        container.forEach((dd, j) => {
                            if (dd.id == seesaw[index][i + 1].id) {
                                container[j] = {}
                            }
                        })
                        seesaw[index].splice(i + 1, 1)
                    }
                }
            })
            seesaw.forEach((res, index) => {
                res.forEach((ele, i) => {
                    if (seesaw[index][i].Col < 4 - (res.length - i) + 1) {
                        let ww = document.getElementById(`${ele.id}`)
                        ww.style.top = (4 - (res.length - i)) * 50 + "px"
                        container.forEach((chang, ind) => {
                            if (ele.id == chang.id) {
                                container[ind].Col = 4 - (res.length - i) + 1
                            }
                        })
                    }
                })
            })
            break;
        case "right":
            about.forEach((res, index) => {
                let test = []
                for (let i = res.length - 1; i >= 0; i--) {
                    test[i] = false
                    if (i < res.length - 1 && res[i + 1].body.innerHTML == res[i].body.innerHTML && test[i + 1] != true) {
                        let Previous = document.getElementById(`${res[i].id}`), thescore = document.getElementById("thescore")
                        test[i] = true
                        score += Number(Previous.innerHTML)
                        Previous.innerHTML = Number(Previous.innerHTML) * 2
                        Previous.style.backgroundColor = color[testnumber(Number(Previous.innerHTML)) % 9 - 1]
                        thescore.innerHTML = score
                        let del = document.getElementById(about[index][i + 1].id)
                        del.remove()
                        container.forEach((dd, j) => {
                            if (dd.id == about[index][i + 1].id) {
                                container[j] = {}
                            }
                        })
                        about[index].splice(i + 1, 1)
                    }
                }
            })
            about.forEach((res, index) => {
                res.forEach((ele, i) => {
                    if (about[index][i].Row < 4 - (res.length - i) + 1) {
                        let ww = document.getElementById(`${ele.id}`)
                        ww.style.left = (4 - (res.length - i)) * 50 + "px"
                        container.forEach((chang, ind) => {
                            if (ele.id == chang.id) {
                                container[ind].Row = 4 - (res.length - i) + 1
                            }
                        })
                    }
                })
            })
            break;
        case "left":
            about.forEach((res, index) => {
                res.forEach((ele, i) => {
                    if (i > 0 && res[i - 1].body.innerHTML == res[i].body.innerHTML) {
                        let Previous = document.getElementById(`${res[i].id}`), thescore = document.getElementById("thescore")
                        score += Number(Previous.innerHTML)
                        Previous.innerHTML = Number(Previous.innerHTML) * 2
                        Previous.style.backgroundColor = color[testnumber(Number(Previous.innerHTML)) % 9 - 1]
                        thescore.innerHTML = score
                        let del = document.getElementById(about[index][i - 1].id)
                        del.remove()
                        container.forEach((dd, j) => {
                            if (dd.id == about[index][i - 1].id) {
                                container[j] = {}
                            }
                        })
                        about[index].splice(i - 1, 1)
                    }
                })
            })
            about.forEach((res, index) => {
                res.forEach((ele, i) => {
                    if (about[index][i].Row > (i + 1)) {
                        let ww = document.getElementById(`${ele.id}`)
                        ww.style.left = i * 50 + "px"
                        container.forEach((chang, ind) => {
                            if (ele.id == chang.id) {
                                container[ind].Row = i + 1
                            }
                        })
                    }
                })
            })
            break;
    }

}
//随机生成一个元素
function newele() {
    function newzb() {
        let zb = {}, w = true
        zb.row = Math.floor(Math.random() * 4) + 1
        zb.col = Math.floor(Math.random() * 4) + 1
        container.forEach(res => {
            if (res.Row == zb.row && res.Col == zb.col) {
                w = false
            }
        })
        return w ? zb : ""
    }
    let wz = newzb(), ele = create(), box = document.getElementById("box")
    while (wz == "") {
        wz = newzb()
    }
    ele.style.top = Number((Number(wz.col) - 1) * 50) + "px"
    ele.style.left = Number((Number(wz.row) - 1) * 50) + "px"
    ele.id = `container${container.length}`
    box.appendChild(ele)
    container.push({
        Row: wz.row,
        Col: wz.col,
        id: `container${container.length}`,
        body: ele
    })
}
//初始化内容
function init() {
    huahua()
}
init()
