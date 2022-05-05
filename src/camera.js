import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native'
import {Camera} from 'expo-camera'
import { Ionicons } from '@expo/vector-icons'; 
import { shadowOffset } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Video } from 'expo-av';

let camera
export default function App({ navigation }) {
  const [startCamera, setStartCamera] = React.useState(true)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState(null)
  const [recordMode, setRecordMode] = React.useState(false)
  const [record, setRecord] = React.useState(null);
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = React.useState('off')
  const video = React.useRef(null);
  

  const __startCamera = async () => {
    const {statusCamera} = await Camera.requestCameraPermissionsAsync()
    const {statusMic} = await Camera.requestMicrophonePermissionsAsync()
    if ((statusCamera && statusMic) === 'granted') {
      setStartCamera(true)
    } else {
      // Alert.alert('Access denied')
    }
  }
  const __takePicture = async () => {
    const photo = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    //setStartCamera(false)
    setCapturedImage(photo)
  }
  const __takeVideo = async () => {
    if(camera){
        setRecordMode(true);
        const data = await camera.recordAsync({
          maxDuration:10
        })
        setRecord(data.uri);
        console.log(data.uri);
    }
  }

  const __stopVideo = async () => {
    camera.stopRecording();
    setRecordMode(false);
    setPreviewVisible(true);
  }

  const __savePhoto = () => {
    const formData = new FormData();
    formData.append('file', {
      name: (Math.random() + 1).toString(36).substring(7) + '.mov',
      type: 'mov',
      uri: Platform.OS === 'ios' ? 
           record.replace('file://', '')
           : record,
    })
    console.log(record)
    console.log(formData)
    return fetch(
      'https://propane-dev.bucknell.edu/upload',
      {
        method: 'post',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      }
      )
      .then(response => response.text())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const __retakePicture = () => {
    setPreviewVisible(false)
    setRecord(null)
    __startCamera()
  }
  const __handleFlashMode = () => {
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
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
          {previewVisible && record ? (
            <CameraPreview record={record} video={video} savePhoto={__savePhoto} retakePicture={__retakePicture} />
          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{flex: 1}}
              ref={(r) => {
                camera = r
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    left: '5%',
                    top: '5%',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <TouchableOpacity
                    onPress={__handleFlashMode}
                    style={{
                      borderRadius: '50%',
                      height: 25,
                      width: 25,
                    }}
                  >
                    <Ionicons name= {flashMode === 'on' ? 'flash' : 'flash-off'} size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={__switchCamera}
                    style={{
                      marginTop: 20,
                      borderRadius: '50%',
                      height: 25,
                      width: 25
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    >
                      <Ionicons name="camera-reverse" size={25} color="white" />
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    backgroundColor: '#000',
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: '8%',
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => navigation.navigate('My Recordings')}
                      style={{
                        borderRadius: '50%',
                        height: 30,
                        width: 30
                      }}>
                        <Ionicons name="file-tray-full-outline" size={30} color="white" />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={recordMode ? __stopVideo : __takeVideo}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: recordMode ? 20 : 50,
                        backgroundColor: recordMode ? '#e74c3c' : '#fff',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={__stopVideo}
                      style={{
                        borderRadius: '50%',
                        height: 30,
                        width: 30
                      }}>
                        <Ionicons name="settings-outline" size={30} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <View></View>
      )}

      <StatusBar style="auto" hidden="true" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  video: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
},
})

const CameraPreview = ({record, video, retakePicture, savePhoto}) => {
  const [status, setStatus] = React.useState({});
  console.log('sdsfds', record)
  return (
    <View
      style={{
        backgroundColor: '#000',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <Video
        ref={video}
        style={styles.video}
        source={{
            uri: record,
        }}
        useNativeControls={false}
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View
                  style={{
                    backgroundColor: '#000',
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: '8%',
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={retakePicture}
                      style={{
                        borderRadius: '50%',
                        height: 30,
                        width: 30
                      }}>
                        <Ionicons name="trash-outline" size={30} color="white" />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                      }
                      style={{
                        borderRadius: '50%',
                        height: 30,
                        width: 30
                      }}>
                        <Ionicons name={status.isPlaying ? 'ios-pause' : 'play'} size={30} color="white" />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress= {savePhoto}
                      style={{
                        borderRadius: '50%',
                        height: 30,
                        width: 30
                      }}>
                        <Ionicons name="cloud-upload-outline" size={30} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
      {/* </ImageBackground> */}
    </View>
  )
}