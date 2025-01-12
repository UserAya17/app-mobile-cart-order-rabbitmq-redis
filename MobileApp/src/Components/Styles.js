import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start", 
  },
  logo: {
    width: 200, 
    height: 200,
    marginTop: 0, 
    marginBottom: 20,
  },
  logoHome: {
    width: 200, 
    height: 200,
    marginTop: 200, 
    marginBottom: 20,
  },
  containerChoice: {
    width: "80%",
    height: 50,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DAA520",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20, 
  },
  buttonn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 8,
  },
  textt: {
    color: "black",
    fontWeight: "bold",
  },
  activeButton: {
    backgroundColor: "#DAA520",
  },
  activeText: {
    color: "white",
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DAA520",
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: "#DAA520",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
});

export default styles;
