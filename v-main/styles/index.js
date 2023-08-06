import styled from 'styled-components/native'

const marginProps = (props) => ({
  marginTop: props.marginTop,
  marginBottom: props.marginBottom,
  marginLeft: props.marginLeft,
  marginRight: props.marginRight,
})

const containerProps = (props) => ([{
  width: props.width,
  height: props.height,
}, marginProps(props)])

export const Container = styled.View((props) => [marginProps(props)])

export const Image = styled.Image((props) => ([{
  resizeMode: 'cover',
}, containerProps(props)]))

export const Text = styled.Text((props) => [containerProps(props)])

export const Button = styled.TouchableOpacity((props) => [containerProps(props)])
