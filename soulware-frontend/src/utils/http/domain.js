export default {
    'board':{
        'list':{task:'get',url:'/boards/board', requestAuth:true},
        'detail':{task:'get',url:'/boards/board/#id',requestAuth:true},
        'add':{task:'post',url:'/boards/board'},
        'delete':{task:'delete',url:'/boards/board/#id',requestAuth:true},
        'edit':{task:'patch',url:'/boards/board/#id',requestAuth:true},
        'download':{task:'download',url:'/boards/download/#id'}
    },
    'auth':{
        'login':{task:'getToken',url:'/accounts/login'},
        'refresh':{task:'refreshToken',url:'/accounts/refresh'}
    },
    'blog':{
        'list':{task:'get',url:'/blogs'}
    },
}