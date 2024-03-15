import React, {useEffect} from 'react';
import {
  useCalls,
  CallingState,
  IncomingCall,
  StreamCall,
  OutgoingCall,
} from '@stream-io/video-react-native-sdk';
import {observer} from 'mobx-react-lite';
import {StyleSheet, View} from 'react-native';
import {Layout} from '../../components/Layout';
import {useAppStore} from '../../context';
import {useRoute} from '@react-navigation/native';

export const CallPanel = observer(() => {
  const route = useRoute();
  const {call} = route.params;
  const calls = useCalls();
  const callClient = useAppStore().getCallClient;
  useEffect(() => {
    const logg = async () => {
      const callss = await callClient?.queryCalls({
        sort: [{field: 'starts_at', direction: -1}],
        limit: 10,
        watch: true,
      });
      console.log(
        '.....................',
        callss?.calls.filter(call => call.isCreatedByMe === true).length,
      );
    };
    logg();
  }, [callClient]);
  const incomingCalls = calls.filter(
    call =>
      call.isCreatedByMe === false &&
      call.state.callingState === CallingState.RINGING,
  );
  const [incomingCall] = incomingCalls;
  console.log({calls});

  if (call) {
    return (
      <Layout>
        <View style={styles.container}>
          <StreamCall call={call}>
            <IncomingCall />
          </StreamCall>
        </View>
      </Layout>
    );
  }

  const outgoingCalls = calls.filter(
    call =>
      call.isCreatedByMe === true &&
      call.state.callingState === CallingState.RINGING,
  );

  const [outgoingCall] = outgoingCalls;
  console.log({outgoingCalls});

  if (outgoingCall) {
    return (
      <Layout>
        <StreamCall call={outgoingCall}>
          <View style={styles.container}>
            <OutgoingCall />
          </View>
        </StreamCall>
      </Layout>
    );
  }

  return null;
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
