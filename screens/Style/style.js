import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerList: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },

  logoContainer: {
    marginTop: 10,
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  containerheader: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
    width: '100%',
    flexDirection: 'row',
  },

  Button: {
    padding : 10,
    width: 200
  },

  InputContainer: {
    flexDirection: "column",
    width: "100%",
    height: "15%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBlock: 10,
    gap: 10
  },

  Input: {
    textAlign: "center",
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 0,
    fontSize: 16,
    backgroundColor: 'white'
  },

  Picker: {
    height: 40,
    fontSize: 16,
    color: '#000',
    borderRadius: 15,
    backgroundColor: "#fff"
  },

  Icon: {
    borderRadius: 50,
    height: 50,
    width: 50,
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center"
  },

  Label: {
    width: "100%"
  },
  title: {
    fontSize: 25
  },
  questionContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  questionText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#4e73df',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    width: '100%',
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
  },
  scoreText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#10ac84',
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  cardContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    width: "100%",
    height: 80,
    flexWrap: "wrap",
    flexDirection: "row"
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 100,
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#444',
  },
  btnPrimary: {
    backgroundColor: '#0d6efd',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnSecondary: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnDanger: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnSuccess: {
    backgroundColor: '#198754',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  }
});

export default styles;