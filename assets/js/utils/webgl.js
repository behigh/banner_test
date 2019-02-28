import {hex_md5} from './md5'

const webgl = () => {


	const width   = 256
	const height  = 128
	const canvas  = document.createElement('canvas')
	canvas.width  = width
	canvas.height = height
	const ctx     = canvas.getContext('webgl2') || canvas.getContext('experimental-webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl') || canvas.getContext('moz-webgl')

	try {
		const f = 'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}'
		const g = 'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}'
		const h = ctx.createBuffer()

		ctx.bindBuffer(ctx.ARRAY_BUFFER, h)

		const i = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .7321, 0])

		ctx.bufferData(ctx.ARRAY_BUFFER, i, ctx.STATIC_DRAW)
		h.itemSize = 3
		h.numItems = 3

		const j = ctx.createProgram()
		const k = ctx.createShader(ctx.VERTEX_SHADER)

		ctx.shaderSource(k, f)
		ctx.compileShader(k)

		const l = ctx.createShader(ctx.FRAGMENT_SHADER)

		ctx.shaderSource(l, g)
		ctx.compileShader(l)
		ctx.attachShader(j, k)
		ctx.attachShader(j, l)
		ctx.linkProgram(j)
		ctx.useProgram(j)

		j.vertexPosAttrib = ctx.getAttribLocation(j, 'attrVertex')
		j.offsetUniform   = ctx.getUniformLocation(j, 'uniformOffset')

		ctx.enableVertexAttribArray(j.vertexPosArray)
		ctx.vertexAttribPointer(j.vertexPosAttrib, h.itemSize, ctx.FLOAT, !1, 0, 0)
		ctx.uniform2f(j.offsetUniform, 1, 1)
		ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, h.numItems)

	} catch (e) {
	}

	let m = ''

	const n = new Uint8Array(width * height * 4)
	ctx.readPixels(0, 0, width, height, ctx.RGBA, ctx.UNSIGNED_BYTE, n)
	m = JSON.stringify(n).replace(/,?"[0-9]+":/g, '')

	return hex_md5(m)
}

export default webgl