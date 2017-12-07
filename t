[1mdiff --git a/src/screens/SignInScreen/index.js b/src/screens/SignInScreen/index.js[m
[1mindex 4c5b27d..d048e32 100644[m
[1m--- a/src/screens/SignInScreen/index.js[m
[1m+++ b/src/screens/SignInScreen/index.js[m
[36m@@ -53,11 +53,12 @@[m [mclass SignInScreen extends Component {[m
   render() {[m
     return ([m
       <View style={styles.container}>[m
[31m-[m
[31m-        <Image[m
[31m-          style={styles.iconStyle}[m
[31m-          source={require('../../assets/images/icon.png')}[m
[31m-        />[m
[32m+[m[32m        <View style={styles.iconStyle}>[m
[32m+[m[32m          <Image[m
[32m+[m[32m            style={styles.iconStyle}[m
[32m+[m[32m            source={require('../../assets/images/logo.png')}[m
[32m+[m[32m          />[m
[32m+[m[32m        </View>[m
         <StyledTextInput[m
           wrapperStyle={styles.interactionWrapper}[m
           style={styles.textInput}[m
[36m@@ -107,7 +108,7 @@[m [mclass SignInScreen extends Component {[m
 }[m
 [m
 SignInScreen.navigationOptions = {[m
[31m-  title: 'Memoriae',[m
[32m+[m[32m  title: 'Welcome to Memoriae',[m
 }[m
 [m
 const styles = StyleSheet.create({[m
[36m@@ -115,17 +116,16 @@[m [mconst styles = StyleSheet.create({[m
     flex: 1,[m
     backgroundColor: colors.backGroundBlue(0.3),[m
     flexDirection: 'column',[m
[32m+[m[32m    paddingRight: 10,[m
[32m+[m[32m    paddingLeft: 10,[m
     //alignItems: 'center',[m
     //justifyContent: 'center',[m
   },[m
 [m
   iconStyle: {[m
[31m-    //width: 100,[m
[31m-    //height: 100,[m
[31m-    //borderRadius: 2,[m
[31m-    flexDirection: 'row',[m
[31m-    justifyContent: 'center',[m
     alignItems: 'center',[m
[32m+[m[32m    paddingRight: 10,[m
[32m+[m[32m    paddingLeft: 10,[m
   },[m
 [m
     interactionWrapper: {[m
[36m@@ -194,7 +194,6 @@[m [mconst styles = StyleSheet.create({[m
     textAlign: 'center',[m
   },[m
 [m
[31m-[m
 });[m
 [m
 [m
