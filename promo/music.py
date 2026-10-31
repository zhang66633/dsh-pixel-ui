import numpy as np, wave
sr=44100
dur=27.4
n=int(sr*dur)
t=np.arange(n)/sr
mix=np.zeros(n)
def note(freq, start, length, amp=0.2, kind='square'):
    a=int(start*sr); b=min(n,int((start+length)*sr))
    if b<=a: return
    tt=np.arange(b-a)/sr
    if kind=='square': w=np.sign(np.sin(2*np.pi*freq*tt))
    elif kind=='triangle': w=2*np.abs(2*(tt*freq-np.floor(tt*freq+0.5)))-1
    else: w=np.sin(2*np.pi*freq*tt)
    env=np.minimum(1, tt/0.005)*np.exp(-tt*3.0)
    mix[a:b]+=amp*w*env
# chords
chords=[[57,60,64],[53,57,60],[48,52,55],[55,59,62]]
beat=0.5; eighth=0.25; bar=2.0
for bar_i in range(int(np.ceil(dur/bar))):
    ch=chords[bar_i%4]
    start=bar_i*bar
    # bass root each beat
    for k in range(4):
        note(ch[0]-12, start+k*beat, 0.42, 0.22, 'triangle')
    # lead arpeggio 8ths
    seq=[ch[0]+12,ch[1]+12,ch[2]+12,ch[1]+12,ch[0]+24,ch[2]+12,ch[1]+12,ch[2]+24]
    for k,f in enumerate(seq):
        note(f, start+k*eighth, 0.22, 0.10, 'square')
    # hats
    for k in range(8):
        a=int((start+k*eighth)*sr); b=min(n,a+int(0.03*sr))
        if b>a:
            rng=np.random.default_rng(bar_i*100+k)
            mix[a:b]+=0.03*rng.standard_normal(b-a)*np.exp(-np.arange(b-a)/(0.006*sr))
    # kick on beats
    for k in range(4):
        a=int((start+k*beat)*sr); b=min(n,a+int(0.12*sr))
        if b>a:
            tt=np.arange(b-a)/sr
            mix[a:b]+=0.25*np.sin(2*np.pi*(120-80*tt/0.12)*tt)*np.exp(-tt*18)
# final chord
for f in [45,57,60,64,69]:
    note(f, 26.0, 1.2, 0.12, 'triangle')
# fades
fade=int(0.8*sr)
mix[:fade]*=np.linspace(0,1,fade)
mix[-fade:]*=np.linspace(1,0,fade)
mix=mix/np.max(np.abs(mix))*0.85
stereo=np.stack([mix,mix],axis=1)
pcm=(stereo*32767).astype('<i2')
with wave.open('music.wav','wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr); w.writeframes(pcm.tobytes())
print('wrote promo/music.wav', dur, 's')
