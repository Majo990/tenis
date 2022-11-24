<template>
  <q-page padding>
    <q-form q-form @submit="onSubmit" class="q-gutter-md">
      <div class="q-pa-md">
        <strong>Formulario </strong>

        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                dense
                v-model="rol.descripcionrol"
                label="Pequeña descipcion "
                lazy-rules
                style="width: 47%"
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su Apellido',
                ]"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 q-gutter-md text-center items-center">
        <q-btn dense color="primary" label="Crear" type="submit" />
        <q-btn dense color="amber" label="Actualizar" @click="Actualizar" />
        <q-btn dense color="red" label="Borrar" @click="Delete" />
      </div>
    </q-form>
    <br />
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-table
        :rows="rows"
        :columns="columns"
        separator="cell"
        dense
        row-key="id"
        selection="single"
        v-model:selected="selected"
        @selection="handleSelection"
      >
      </q-table>
    </div>
    <br />


    <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md"

      style="max-width: 300px"  style1="max-height:400px"
    >
      <q-separator  spaced />
      <q-item-label header>Lista Permisos </q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check1" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear arbitro</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check2" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar arbitro</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check3" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar arbitro</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check4" />
        </q-item-section>

        <q-item-section>
          <q-item-label> borrar arbitro</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check5" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear comportamientos</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check6" />
        </q-item-section>

        <q-item-section>
          <q-item-label> visualizar comportamientos</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check7" />
        </q-item-section>

        <q-item-section>
          <q-item-label> actualizar comportamientos</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check8" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar comportamientos</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check9" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear entrenadores</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check10" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar entrenadores</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check11" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar entrenadores</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check12" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar entrenadores</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check13" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear equipos</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check14" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar equipos</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check15" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar equipos</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check16" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar equipos</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check17" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear estadio</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check18" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar estadio</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check19" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar estadio</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check20" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar estadio</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check21" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear evento</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check22" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar evento </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check23" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar evento </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check24" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar evento </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check25" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear falta</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check26" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar falta </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check27" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar falta</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check28" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar falta </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check29" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear historial-partida</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check30" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar historial-partida</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check31" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar historial-partida</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check32" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar historial-partida</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check33" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear jueces</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check34" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar jueces</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check35" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar jueces</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check36" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar jueces</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check37" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear jugadores</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check38" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar jugadores</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check39" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar jugadores</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check40" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar jugadores</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check41" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear partida-jugador</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check42" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar partida-jugador</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check43" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar partida-jugador</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check44" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar partida-jugador</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check45" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear partida</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check46" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar partida </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check47" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar partida </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check48" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar partida</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check49" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear perfil</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check50" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar perfil</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check51" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar perfil</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check52" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar perfil</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check53" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear permiso-rol</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check54" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar permiso-rol</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check55" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar permiso-rol</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check56" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar permiso-rol</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check57" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear permiso</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check58" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar permiso</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check59" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar permiso</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check60" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar permiso</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check61" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear premio</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check62" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar premio</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check63" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar premio</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check64" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar premio</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check65" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear rol</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check66" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar rol</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check67" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar rol</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check68" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar rol</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check69" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear ronda</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check70" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar ronda</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check71" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar ronda</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check72" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar ronda</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check73" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear sancion</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check74" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar sancion </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check75" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar sancion </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check76" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear torneo</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check77" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar torneo</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check78" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar torneo</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check79" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar torneo</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check80" />
        </q-item-section>

        <q-item-section>
          <q-item-label>crear usuario</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check81" />
        </q-item-section>

        <q-item-section>
          <q-item-label>visualizar usuario</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check82" />
        </q-item-section>

        <q-item-section>
          <q-item-label>actualizar usuario</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check83" />
        </q-item-section>

        <q-item-section>
          <q-item-label>borrar usuario</q-item-label>
        </q-item-section>
      </q-item>
    </div>
            </div>
          </div>
  
  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { getRoles, crearRoles, updateRoles, deleteRoles } from "../services";

const columns = [
  {
    name: "descripcionrol",
    required: true,
    label: "Descripcion",
    align: "left",
    field: "descripcionrol",
    sortable: true,
  },
];

const check1 = ref([]);
const check2 = ref([]);
const check3 = ref([]);
const check4 = ref([]);
const check5 = ref([]);
const check6 = ref([]);
const check7 = ref([]);
const check8 = ref([]);
const check9 = ref([]);
const check10 = ref([]);
const check11 = ref([]);
const check12 = ref([]);
const check13 = ref([]);
const check14 = ref([]);
const check15 = ref([]);
const check16 = ref([]);
const check17 = ref([]);
const check18 = ref([]);
const check19 = ref([]);
const check20 = ref([]);
const check21 = ref([]);
const check22 = ref([]);
const check23 = ref([]);
const check24 = ref([]);
const check25 = ref([]);
const check26 = ref([]);
const check27 = ref([]);
const check28 = ref([]);
const check29 = ref([]);
const check30 = ref([]);
const check31 = ref([]);
const check32 = ref([]);
const check33 = ref([]);
const check34 = ref([]);
const check35 = ref([]);
const check36 = ref([]);
const check37 = ref([]);
const check38 = ref([]);
const check39 = ref([]);
const check40 = ref([]);
const check41 = ref([]);
const check42 = ref([]);
const check43 = ref([]);
const check44 = ref([]);
const check45 = ref([]);
const check46 = ref([]);
const check47 = ref([]);
const check48 = ref([]);
const check49 = ref([]);
const check50 = ref([]);
const check51 = ref([]);
const check52 = ref([]);
const check53 = ref([]);
const check54 = ref([]);
const check55 = ref([]);
const check56 = ref([]);
const check57 = ref([]);
const check58 = ref([]);
const check59 = ref([]);
const check60 = ref([]);
const check61 = ref([]);
const check62 = ref([]);
const check63 = ref([]);
const check64 = ref([]);
const check65 = ref([]);
const check66 = ref([]);
const check67 = ref([]);
const check68 = ref([]);
const check69 = ref([]);
const check70 = ref([]);
const check71 = ref([]);
const check72 = ref([]);
const check73 = ref([]);
const check74 = ref([]);
const check75 = ref([]);
const check76 = ref([]);
const check77 = ref([]);
const check78 = ref([]);
const check79 = ref([]);
const check80 = ref([]);
const check81 = ref([]);
const check82 = ref([]);
const check83 = ref([]);
/*const check84 = ref([]);
const check85 = ref([]);
const check86 = ref([]);
const check87 = ref([]);
const check88 = ref([]);
const check89 = ref([]);
const check90 = ref([]);
const check91 = ref([]);
const check92 = ref([]);
const check93 = ref([]);
const check94 = ref([]);
const check95 = ref([]);
const check96 = ref([]);
const check97 = ref([]);
const check98 = ref([]);
const check99 = ref([]);
const check100 = ref([]);
const check101 = ref([]);
const check102 = ref([]);
const check103 = ref([]);
const check104 = ref([]);
const check105 = ref([]);
const check106 = ref([]);
const check107 = ref([]);
const check108 = ref([]);
const check109 = ref([]);*/

const rows = ref([]);
const selected = ref([]);

const rol = reactive({
  descripcion: null,
});

async function onSubmit() {
  await crearRoles(rol);
}

async function Actualizar() {
  await updateRoles(rol);
}

async function Delete() {
  await deleteRoles(rol);
}

onMounted(async () => {
  rows.value = await getRoles();
});

function handleSelection(details) {
  let rowSelected = {
    descripcionrol: null,
  };
  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(rol, rowSelected);
}
</script>


<style>


</style>
