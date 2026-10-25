<!-- l10n-sync: source-file="04-design-vibes.md" -->
# Parte 4: Tematización orientada al diseño

---

En esta parte, usarás los ciclos de planificación e implementación de Copilot para transformar el tema de forma integral. Este es un flujo de desarrollo orientado al diseño: empieza con una idea, itera sobre los elementos visuales y deja que Copilot se encargue del trabajo de CSS.

## Tarea 1: Planifica el tema retro

<!-- track:vscode:start -->
Cambia a **Plan** en GitHub Copilot Chat.
<!-- track:vscode:end -->

<!-- track:cli:start -->
Usa `/plan` en GitHub Copilot CLI o pulsa **Shift+Tab** hasta activar el modo de planificación.
<!-- track:cli:end -->

Escribe este prompt:

> Quiero transformar esta página en una experiencia completa de arcade retro. Planifica una renovación visual integral que incluya: efectos de líneas de barrido CRT en el fondo, un resplandor de neón pulsante en el título, una insignia VS animada con cambios de degradado, un efecto de brillo sobre las tarjetas de resultados de los usuarios, animaciones de entrada flotante para los campos de entrada, texto de carga que alterne entre verde y morado, y efectos de resplandor al pasar el cursor sobre los cuadros de contribuciones. Mantén el fondo oscuro (`#0a0a1a`) con acentos verdes (`#5fed83`) y morados (`#8a2be2`). Usa el tema oscuro y la fuente retro de videojuegos Press Start 2P de Google Fonts.

Copilot generará un plan detallado que abarcará todos los efectos visuales. **No lo aceptes de inmediato**: revísalo e itera:

- Sugiere ajustes al ritmo de las animaciones, por ejemplo: *«Haz que el pulso de neón sea más lento, de unos 3 segundos»*.
- Pregunta por efectos concretos, por ejemplo: *«¿Cómo funcionará el efecto de brillo sobre las tarjetas?»*.
- Pide que cambie el enfoque si algo no te convence.

## Tarea 2: Implementa el tema

Cuando estés satisfecho con el plan, pide a Copilot que lo implemente:

> Implementa el plan del tema de arcade retro que acabamos de diseñar.

Copilot añadirá varias animaciones CSS, pseudoelementos y transiciones a la hoja de estilos. Entre otras cosas, puede incluir:

- `@keyframes` para las líneas de barrido, el pulso de neón, el brillo y las animaciones de entrada flotante.
- Pseudoelementos (`::before`, `::after`) para los efectos superpuestos.
- Propiedades personalizadas de CSS para los colores del tema.
- Transiciones y estados de desplazamiento para los elementos interactivos.

<!-- track:cli:start -->
Cuando se apliquen los cambios, usa `/diff` para revisarlos antes de aprobarlos.
<!-- track:cli:end -->

## Tarea 3: Ajusta el estilo

> **⚠️ ¿No ves los cambios?** Si no aparecen el nuevo tema o las animaciones, detén el servidor de desarrollo (`Ctrl+C`), reinícialo con `npm run dev` y actualiza completamente el navegador (`Ctrl+Shift+R`).

Mantén abierta la vista previa del navegador e itera sobre el diseño. Prueba prompts como:

> El efecto de líneas de barrido es demasiado intenso; reduce la opacidad a 0.03.

> Añade un parpadeo eléctrico sutil al texto del título.

> La insignia VS debería pulsar con más intensidad.

Esto es **desarrollo orientado al diseño**: iteras sobre el resultado visual en tiempo real. Cada prompt refina la experiencia hasta que se vea como quieres. No te conformes: sigue ajustando el estilo hasta que la página parezca sacada de una máquina arcade.

## Tarea 4: Actualiza las instrucciones

Las instrucciones deben reflejar las decisiones importantes de diseño para que los próximos prompts mantengan el rumbo.

<!-- track:vscode:start -->
Pide esto a Copilot Chat:

> Añade a `copilot-instructions.md` una guía de diseño que describa nuestro tema de arcade retro: colores, fuentes y estilo de animación.
<!-- track:vscode:end -->

<!-- track:cli:start -->
Pide esto a Copilot CLI:

> Actualiza las instrucciones del repositorio con una guía breve de diseño para el tema de arcade retro: colores, fuentes, estilo de animación y la regla de que la nueva interfaz debe conservar la estética de neón.
<!-- track:cli:end -->

Cuando la página tenga el aspecto deseado, haz commit de las instrucciones actualizadas y los cambios de diseño.

## ✅ Parte 4 completada

**Lo que aprendiste:**

- Usar flujos de planificación para definir un **sistema de diseño antes de implementarlo**.
- **Iterar sobre el resultado visual** con prompts de seguimiento para pulir el diseño.
- **Actualizar las instrucciones tras tomar decisiones importantes** para que Copilot mantenga la identidad visual.
