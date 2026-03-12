import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default function App() {
	return (
		<View style={styles.container}>
			<Text>Open up App.tsx to start working on your app!</Text>
			<StatusBar style="auto" />

			<View style={styles.header}>
				<Image source={require('../../assets/Group.png')} style={styles.logoIcon}/>
    			<Text style={styles.logo}>WORLD IT</Text>

				<View style={styles.headerIcons}>
					<TouchableOpacity style={styles.icon}>
						<Image
							source={require('../assets/add.png')}
							style={styles.iconImage}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.icon}>
						<Image
							source={require('../assets/setting.png')}
							style={styles.iconImage}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.icon}>
						<Image
							source={require('../assets/exit.png')}
							style={styles.iconImage}
						/>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.footer}>

				<TouchableOpacity style={styles.footerItem}>
					<Image
						source={require('../assets/House.png')}
						style={styles.footerIcon}
					/>
					<Text style={styles.footerText}>Головна</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.footerItem}>
					<Image
						source={require('../assets/my_publication.png')}
						style={styles.footerIcon}
					/>
					<Text style={styles.footerText}>Публікації</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.footerItem}>
					<Image
						source={require('../assets/people.png')}
						style={styles.footerIcon}
					/>
					<Text style={styles.footerText}>Друзі</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.footerItem}>
					<Image
						source={require('../assets/chat.png')}
						style={styles.footerIcon}
					/>
					<Text style={styles.footerText}>Чати</Text>
				</TouchableOpacity>
      		</View>
      	</View>
	);
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	header: {
		height: 70,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#543C52",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
	},

	logo: {
		fontSize: 18,
		width: 116,
		height:16,
		color:"#543C52"
	},

	headerIcons: {
		flexDirection: "row",
	},

	icon: {
		width: 40,
		height: 40,
		borderRadius: 18,
		borderWidth: 1,
		borderColor: "#543C52",
		marginLeft: 10,
		
	},
	iconImage:{
		width:22,
		height:22,
	},

	logoIcon:{
		width:20,
		height:20,
		marginRight:8
	},

	logoContainer:{
		flexDirection:"row",
		alignItems:"center"
	},
	footer: {
		height: 70,
		borderTopWidth: 1,
		borderTopColor: "#543C52",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
  	},

  	footerItem: {
    	alignItems: "center",
  	},

  	footerIcon: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: "#543C52",
		marginBottom: 4,
  	},

  	footerText: {
    	fontSize: 14,
		color: "#543C52"
  	},
});
