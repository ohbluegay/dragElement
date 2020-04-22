const drag = {
    element: {
        elbutton: {
            tag: 'elbutton',
            attrs: {
                name: 'btnRequest'
            }
        },
        datepicker: {
            tag: 'datepicker',
            attrs: {}
        },
        elselect: {
            tag: 'elselect',
            attrs: {
                caption: '',
                options: [{
                    label: '选项1',
                    value: 1
                }]
            }
        },
        chart: {
            tag: 'chart',
            attrs: {}
        }
    },
    container: {
        container: {
            tag: 'container',
            attrs: {
                name: 'ctright',
                padding: '0',
                borderSides: '8'
            },
            children: []
        },
        sizecontent: {
            tag: 'sizecontent',
            children: []
        },
        toolbar: {
            tag: 'toolbar',
            attrs: {
                name: 'lcToolbar'
            },
            children: []
        },
        sheetcontrol: {
            tag: 'sheetcontrol',
            attrs: {},
            children: []
        },
        container3_1: {
            tag: 'container',
            attrs: {
                name: 'ctright',
                padding: '0',
                borderSides: '8',
                span: 8
            },
            children: []
        },
        container3_2: {
            tag: 'container',
            attrs: {
                name: 'ctright',
                padding: '0',
                borderSides: '8',
                span: 16
            },
            children: []
        },
        container2_1: {
            tag: 'container',
            attrs: {
                name: 'ctright',
                padding: '0',
                borderSides: '8',
                span: 12
            },
            children: []
        }
    }
}

export default drag