var app = getApp();
Page({
    data: {
        
        titles: [],
        cols: [],
        modelsData: [],
        id: 0,
        show: false,
        create: false,
        tables: [
          ['标题', '标题', '标题', '标题', '标题', '标题']
        ]
    },
    onLoad(options) {
      // 初始化的时候尝试获取存储的table,否则新建tables
       let that = this;
        let id = options.id;
        wx.request({
            url: app.globalData.apiUrl + '/table/' + id,
            header: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + wx.getStorageSync('dm_token')
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res) {
              // 
            },
        })
    },
    openModel(e) {
        let id = e.target.dataset.id;
        this.setData({
            titles: this.data.tables[0],
            cols: this.data.tables[id],
            id: id,
            show: true
        });
    },
    editModel(e) {
        let tables = this.data.tables;
        tables[this.data.id] = this.data.cols;

        this.setData({
            tables: tables,
            show: false
        });

    },
    deleteModel(e){
        let tables = this.data.tables;
        tables.splice(this.data.id,1);
        this.setData({
            tables:tables,
            show:false
        })
    },
    openAddModel(e) {
        let newData = ["", "", "", "", "", ""];
        this.setData({
            titles: this.data.tables[0],
            cols: newData,
            create: true
        })
    },
    addModel() {
        let table = this.data.tables;
        table.push(this.data.cols);
        this.setData({
            tables: table,
            create: false
        })
    },
    closeModel() {
        this.setData({
            show: false,
            create: false
        })
    },
    dataChange(e) {
        let cols = this.data.cols;
        cols[e.target.dataset.id] = e.detail.value;
        console.log(cols);
        this.setData({
            cols: cols
        });

    },
    submitModel() {
       // 提交表单中的数据
      // var that = this;
      // wx.request({
      //   url: 
      //   data: {
      //     content: that.data.tables
      //   }, // 请求的参数
      //   header: {
      //     'Content-Type': 'application/json',
      //    
      //   }, // HTTP Header , header 中不能设置 Referer
      //   method: 'POST', // 默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //   success(res) { // 接口调用成功的回调函数
      //     if (res.data.code === 0) {
      //       wx.showToast({
      //         title: "成功",
      //         icon: "suceess",
      //         duration: 1000
      //       })
      //     }
      //   },
      // })
    },
    clearModel() {
        let tables = []
        tables.push(this.data.tables[0])
        this.setData({
            tables: tables
        })
    }
})