import { Button, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Camera, CameraType } from 'expo-camera';


const CameraPreview = ({ photo, retakePicture }) => {
    console.log('sdsfds', photo)
    return (
        <View
            style={{
                backgroundColor: 'transparent',
                flex: 1,
                width: '100%',
                height: '100%'
            }}>
            <ImageBackground
                source={{ uri: photo && photo.uri }}
                style={{
                    flex: 1
                }}>
                <TouchableOpacity
                    onPress={retakePicture}
                    style={{
                        position: 'absolute',
                        bottom: 15,
                        left: 15
                    }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Re - take</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

const CameraLibrary = () => {
    const [cameraRef, setCameraRef] = useState(null);
    const [startCamera, setStartCamera] = React.useState(false)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null)
    const [flashMode, setFlashMode] = React.useState('on')
    const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)

    const __startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            setStartCamera(true)
        } else {
            Alert.alert("Access denied")
        }
    }

    const __takePicture = async () => {
        if (!cameraRef) return
        const photo = await cameraRef.takePictureAsync()
        console.log(photo)
        setPreviewVisible(true)
        setCapturedImage(photo)
    }

    const __retakePicture = () => {
        setCapturedImage(null)
        setPreviewVisible(false)
        __startCamera()
    }

    const __handleFlashMode = () => {
        console.log('flashmode', flashMode)
        if (flashMode === 'on') {
            setFlashMode('off')
        } else if (flashMode === 'off') {
            setFlashMode('on')
        } else {
            setFlashMode('auto')
        }

    }

    const __switchCamera = () => {
        if (cameraType === 'back') {
            setCameraType('front')
        } else {
            setCameraType('back')
        }
    }

    return (
        <View style={styles.container}>
            {/* {
                startCamera ? <Camera
                    flashMode={flashMode}
                    type={cameraType}
                    style={{ flex: 1 }}
                    ref={(r) => {
                        setCameraRef(r)
                    }}></Camera> : <View
                        style={{
                            flex: 1,
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                    <TouchableOpacity
                        onPress={__startCamera}
                        style={{
                            width: 130,
                            borderRadius: 4,
                            backgroundColor: '#14274e',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}
                        >
                            Take picture
                        </Text>
                    </TouchableOpacity>
                </View>
            } */}
            {previewVisible && capturedImage ? (
                <CameraPreview photo={capturedImage} retakePicture={__retakePicture} />
            ) : (
                <Camera
                    flashMode={flashMode}
                    type={cameraType}
                    style={{ flex: 1 }}
                    ref={(r) => {
                        setCameraRef(r)
                    }}>
                    <View
                        style={{
                            flex: 1,
                            width: '100%',
                            backgroundColor: 'transparent',
                            flexDirection: 'row'
                        }}>
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                flexDirection: 'row',
                                flex: 1,
                                width: '100%',
                                padding: 20,
                                justifyContent: 'space-between'
                            }}>
                            <View
                                style={{
                                    alignSelf: 'center',
                                    flex: 1,
                                    alignItems: 'center'
                                }}>
                                <TouchableOpacity
                                    onPress={__takePicture}
                                    style={{
                                        width: 70,
                                        height: 70,
                                        bottom: 0,
                                        borderRadius: 50,
                                        backgroundColor: '#fff'
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={__handleFlashMode}
                        style={{
                            position: 'absolute',
                            left: '5%',
                            top: '10%',
                            height: 30,
                            width: 30
                        }}>
                        <Text
                            style={{
                                fontSize: 20
                            }}>
                            ⚡️
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={__switchCamera}
                        style={{
                            left: 20,
                            bottom: 60
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#fff'
                            }}>
                            {cameraType === 'front' ? 'back' : 'Front'}
                        </Text>
                    </TouchableOpacity>
                </Camera>
            )}
        </View>
    )
}

export default CameraLibrary

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})