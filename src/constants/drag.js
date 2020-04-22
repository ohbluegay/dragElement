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
        }
    }
}

export default drag