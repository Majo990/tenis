
<template>

<h1>Campeonato Frontond
</h1><!--$indigo-13-->


<q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-pa-md q-gutter-md login "
      >
      <form action="#">
  <div class="column" style="height: 10px">


<div class="column ">
  <q-input outlined v-model="text" label="" />
</div>
<h5>Jugador1</h5>
<div class="column ">
  <q-input outlined v-model="text" label="" />
</div>
</div>
</form>


      </q-form>
</template>


<script>


</script>


<style>
.column{
 width:70px;
 height:50px;

}
 h1
{
  color: rgb(150,188,15);
  text-align: center;
  font-size: 89px;
  -webkit-text-stroke: 1.5px rgb(71, 207, 8);

}

.q-form{
  text-align: center;
  margin-left:50px;
  margin-right: 10px;
  height:400px;
  width:600px;
}
</style>
