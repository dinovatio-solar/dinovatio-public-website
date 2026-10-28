# Datos que faltan para terminar el SEO

Todo lo que se podía resolver desde el código ya está hecho. Lo que queda
depende de información que solo tiene la empresa, y sin ella hay trabajo que no
se puede ni empezar.

Este documento es para completar y devolver. Cada bloque dice **por qué** hace
falta y **dónde** va a parar, para que se entienda qué se gana con cada dato.

---

## 1. Dirección física y datos de la empresa — BLOQUEANTE

Es el dato que más cosas traba. Sin él no hay ficha de Google, y sin ficha de
Google no hay forma de aparecer en el mapa, que es donde se decide la mayoría
de las búsquedas locales de este rubro.

| Dato | Valor |
|---|---|
| Razón social | |
| CUIT | |
| Calle y número | |
| Localidad y departamento | |
| Código postal | |
| Teléfono fijo (si hay) | |
| Horario de atención | |
| ¿Se atiende al público en esa dirección? | sí / no, solo a domicilio |

**Dónde va:** `src/lib/site.ts` (constante `ADDRESS`), que alimenta el
`LocalBusiness` en datos estructurados y el pie del sitio. Hoy está vacío y el
schema omite la calle, así que el perfil queda incompleto para Google.

> Si la empresa trabaja solo a domicilio y no quiere publicar la dirección,
> Google permite ocultarla en la ficha: se registra igual pero se muestra el
> área de cobertura en vez de la calle. Lo que no se puede es no tenerla.

---

## 2. Google Business Profile — BLOQUEANTE para las reseñas

**Estado hoy: no existe.** Lo busqué y no hay ficha ni mención de Dínamo
Energía en Maps.

Esto importa más de lo que parece: la competencia directa tiene entre 11 y 236
reseñas. Partir de cero no es un problema en sí, pero no tener dónde recibirlas
sí lo es.

El alta la tiene que hacer alguien de la empresa, porque Google verifica por
teléfono, postal o video, y pide ser titular. Lo que hace falta antes:

- [ ] Los datos del punto 1
- [ ] Una cuenta de Google de la empresa (no la personal de alguien que mañana se va)
- [ ] Categoría principal sugerida: *Contratista de paneles solares*
- [ ] 8 a 10 fotos reales: instalaciones terminadas, equipo trabajando, vehículo, frente
- [ ] Área de cobertura: los departamentos que realmente se atienden (ver punto 4)

Una vez creada, conseguir las primeras reseñas es cuestión de pedírselas a
clientes ya instalados. Diez reseñas reales mueven más la aguja que cualquier
cosa que se pueda escribir en el sitio.

---

## 3. Casos de éxito con datos verificables

Es lo que más diferenciaría al sitio de cualquier competidor, y es lo único que
no se puede escribir sin datos: inventar un caso sería publicar algo falso.

Para cada instalación que se quiera mostrar, idealmente tres:

| Dato | Caso 1 | Caso 2 | Caso 3 |
|---|---|---|---|
| Tipo (casa / industria / campo) | | | |
| Localidad | | | |
| Potencia instalada (kWp) | | | |
| Mes y año de la instalación | | | |
| Consumo previo (kWh/mes o $/mes) | | | |
| Consumo o factura posterior | | | |
| Superficie usada (m²) | | | |
| ¿Hay fotos propias? | | | |
| ¿El cliente autoriza que se lo nombre? | sí / no / solo el rubro | | |

Si el cliente no autoriza que se lo nombre, el caso sirve igual de forma
anónima: *"Bodega en Maipú, 80 kWp"* ya es mucho más creíble que una frase
genérica. Lo que no sirve es un caso sin números.

**Dónde va:** hoy existe el componente `SuccessStories`, pero no está montado
en ninguna página porque no hay con qué llenarlo. Con estos datos se arma una
página `/casos` con el mismo formato que las de servicio, y las fichas se
pueden marcar con datos estructurados.

---

## 4. Confirmaciones rápidas

Cosas que ya están escritas en el sitio y hay que validar, o corregir.

- [ ] **Zonas que se atienden de verdad.** Hoy hay páginas de Godoy Cruz,
      Maipú, Guaymallén, Luján de Cuyo y San Rafael. Si alguna no se cubre,
      hay que sacarla: prometer cobertura que no existe genera consultas que
      después no se pueden atender.
- [ ] **Casilla de correo real.** Se usó `contacto@dinamoenergia.com.ar` por
      coherencia con el dominio, pero hay que confirmar que exista.
- [ ] **Matrícula del instalador**, si la hay. El sitio dice "instalación
      certificada"; poder decir por quién lo vuelve verificable.
- [ ] **Los porcentajes de ahorro** del estimador (65–72% residencial, 86–96%
      industrial) vienen de una matriz que ya estaba en el código. Conviene
      contrastarlos contra instalaciones propias.
- [ ] **Precios de referencia**: por ahora el sitio no publica ninguno, a
      propósito. Si se quieren publicar, tienen que salir de presupuestos
      reales y llevar fecha, porque se mueven con el dólar.

---

## 5. Pendientes técnicos que no dependen de estos datos

Anotados acá para que no se pierdan, pero no bloquean nada de lo anterior.

- [ ] El formulario de newsletter **no guarda nada**: muestra un `alert()` y
      descarta la dirección. Se mide el evento, pero el contacto se pierde.
- [ ] `WhatsAppFAB` existe como componente pero no se renderiza en ninguna
      página. Puede haber sido un olvido.
- [ ] El selector de provincias ofrece 13 provincias y **todas apuntan al
      mismo WhatsApp de Mendoza**.
- [ ] `API_ORIGIN` sigue apuntando a `api.dinovatio.com.ar`. Funciona, pero
      arrastra el nombre anterior al rebrand.
- [ ] Hay cuatro componentes de calculadora sin usar (`Calculator`,
      `SavingsDiscreteSlider`, `SavingsMiniWizard`, `SavingsQuickEstimator2`).
      No llegan al usuario; conviene borrarlos o decidir cuál se queda.
- [ ] `hero-3` es de 740×493, así que se ve escalado en un hero a pantalla
      completa. Hace falta reemplazar el archivo original por uno de 1920 px.
