<template>
     <div class="container-xl">
      <div class="text-center mb-5">
        <div class="icon-circle">
          <i :class="`ml-2 mb-1 bi ${foundIcon} `"></i>
        </div>
        <h2 class="mt-4 display-5 fw-bold text-dark">{{ pagetitle }}</h2>
        <p class="text-muted mt-2 fs-5">{{ pagedesc }}</p>
      </div>
    </div>
</template>
<script>
export default{
  name:"PAGECARD",
    props:{
      pagetitle:{
        required:true,
         type: String,
      },
      pageIcon:{
        required:true,
        type: String,
      },
      pagedesc:{
         type: String,
      }

    },
    data(){
      return {
      iconList:[ {label:'box',classlabel:"bi-box-seam" },
                 {label:'truck',classlabel:"bi-truck"},
                 {label:'star',classlabel:'bi-star-fill'},
                 {label:'clock',classlabel:'bi-clock'},
      ]
       
      }
    },
    computed:{
      foundIcon(){
        var res= this.iconList.find((item)=>{
                  return item.label === this.pageIcon;
        })
        return res?res.classlabel:'';
      }
    }
}
</script>