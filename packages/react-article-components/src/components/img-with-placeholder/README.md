# Img

## Usage

### Normal Mode

If `Boolean(props.objectFit) === false`, the `Img` is in normal mode:

1. Given a parent container with `width`.
2. The `Img` will take the `width` / `height` ratio of `defaultImage` to calculate the height of the image, so it can show placeholder with height as the image file given.

```jsx
const Conatner = styled.div`
  width: 500px;
`

const imgProps = {
  itemProp: 'contentUrl',
}

const Image = ({ image, alt = '', caption = '' }) => (
  <Container>
    <figure itemScope itemType="http://schema.org/ImageObject">
      <Img
        alt={alt}
        imgProps={imgProps}
        imageSet={[image.tiny, image.mobile, image.tablet, image.desktop]}
        defaultImage={image.mobile}
      />
      <Caption itemprop="description">{caption}</Caption>
    </figure>
  </Container>
)
```

### Object-fit Mode

If `Boolean(props.objectFit) === true`, the `Img` is in object-fit mode:

1. Given a parent container with certain `width` and `height`.
2. The `Img` will set the `<img>` size to fit container's `width` and `height` (by `100%` according to its parent's size).
3. The `Img` will set `img.style.objectFit` with given `props.objectFit`, and `img.style.objectPosition` with `props.objectPosition`.
4. If the browser doesn't support `object-fit`, the `Img` will take `props.defaultImage` as the `background-image`, `props.objectFit` as the `background-size`, and `props.objectPosition` as the `background-position`.

```jsx
const ImageSizer = styled.div`
  width: 80%;
  height: 200px;
`

const imgProps = {
  itemProp: 'contentUrl',
}

const Image = ({ image, alt = '', caption = '' }) => (
  <Container>
    <figure itemScope itemType="http://schema.org/ImageObject">
      <ImageSizer>
        <Img
          alt={alt}
          imgProps={imgProps}
          imageSet={[image.tiny, image.mobile, image.tablet, image.desktop]}
          defaultImage={image.mobile}
          objectFit="cover"
          objectPosition="center center"
        />
      </ImageSizer>
      <Caption itemprop="description">{caption}</Caption>
    </figure>
  </Container>
)
```
