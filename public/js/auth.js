// public/js/auth.js
const status1 = document.getElementById('status');
const status2 = document.getElementById('status2');

// LOGIN
document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();
  status1.textContent = 'Entrando...';
  const email = document.getElementById('login-email').value.trim();
  const senha = document.getElementById('login-senha').value;
  try {
    await firebase.auth().signInWithEmailAndPassword(email, senha);
    window.location.href = './dashboard.html';
  } catch (err) {
    status1.textContent = err.message || 'Erro ao entrar';
  }
});

// SIGNUP
document.getElementById('form-signup').addEventListener('submit', async (e) => {
  e.preventDefault();
  status2.textContent = 'Criando...';

  const nome = document.getElementById('signup-nome').value.trim();
  const telefone = document.getElementById('signup-telefone').value.trim() || null;
  const email = document.getElementById('signup-email').value.trim();
  const senha = document.getElementById('signup-senha').value;

  try {
    const cred = await firebase.auth().createUserWithEmailAndPassword(email, senha);
    const uid  = cred.user.uid;

    const indicadoPor = (typeof getSavedReferral === 'function') ? getSavedReferral() : null;
    const doc = {
      nome, email, telefone,
      perfil: 'cliente',
      criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    };
    if (indicadoPor && indicadoPor !== uid) doc.indicadoPor = indicadoPor;

    await db.collection('clientes').doc(uid).set(doc, { merge:true });

    // cria registro em indicacoes (se houve ref)
    if (doc.indicadoPor) {
      const indicacaoId = `${doc.indicadoPor}_${uid}`;
      await db.collection('indicacoes').doc(indicacaoId).set({
        indicadorId: doc.indicadoPor,
        indicadoId : uid,
        status     : 'cadastrado',
        origem     : 'link',
        criadoEm   : firebase.firestore.FieldValue.serverTimestamp()
      }, { merge:true });
    }

    try { localStorage.removeItem('retorno_referral'); } catch(_) {}
    window.location.href = './dashboard.html';
  } catch (err) {
    status2.textContent = err.message || 'Erro ao criar conta';
  }
});

// Se já estiver logado, pular para o painel
firebase.auth().onAuthStateChanged((user)=>{
  const onIndex = location.pathname.endsWith('index.html') || location.pathname.endsWith('/') || location.pathname.endsWith('/public');
  if (user && onIndex) window.location.href = './dashboard.html';
});
