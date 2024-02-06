# Ejemplo de modos de fusión sin afectar al fondo

Para aplicar los *blend modes* sin que afecte al fondo transparente.

Ejemplo utilizando las imágenes del [tutorial de sharp de DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-use-blend-modes-in-adobe-photoshop).

0. Partiendo de la imagen en escala de grises con fondo transparente.

![Imagen original en escala de grises.](images/sammy-grayscale.png "Imagen original")

1. Creamos una máscara con el canal alfa de la imagen a la que queremos aplicar el *blend mode*.

![Máscara con el canal alfa de la imagen original.](images/mask.png "Máscara")

2. Aplicamos el *blend mode* a la imagen con la máscara. Esto coloreará la imagen afectando al fondo transparente.

![Imagen con modo multiplicar aplicado.](images/coloredSammy.png "Modo multiplicar")

3. Limpiamos esos pixeles usando la máscara con el alpha de la imagen original.

![Imagen con modo multiplicar aplicado y fondo transparente.](images/coloredSammyWithAlpha.png "Modo multiplicar limpio")

4. Podemos aplicar esta imagen limpia sobre cualquier fondo manteniendo la transparencia.

![Imagen con modo multiplicar aplicado y fondo transparente.](images/sammy-underwater.png "Modo multiplicar limpio sobre fondo")
