import React,{useEffect} from 'react';
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import Link from 'next/link';

const Home = () => {
  var aboutContent = null;
  var contactContent = null
  useEffect(()=>{
    aboutContent=document.querySelector('#about-content')
  },[])
  useEffect(()=>{
    contactContent=document.querySelector('#contact-content')
  },[])
  return (
    <div>
      <Head>
        <title>mkaraca</title>
        <meta name="description" content="Portfolio website" />
        <script type='text/javascript'src='js/winbox.bundle.js'></script>
      </Head>
      <div className={styles.container}>
        <nav >
        <ul>
          <li onClick={()=>{
            new WinBox({
              title: "ABOUT ME",
              x: "center",
              y: "center",
              width: "40%",
              height: "40%",onfocus: function(){this.setBackground('#ff007f')},
              onblur: function(){this.setBackground('#999')},
              mount:aboutContent,
          });
          }}><span className='spanClass'>/about</span></li>
          <li onClick={()=>{
            new WinBox({
              title: "CONCANT ME",
              x: "center",
              y: "center",
              width: "40%",
              height: "40%",onfocus: function(){this.setBackground('#ff007f')},
              onblur: function(){this.setBackground('#999')},
              mount:contactContent,
          });
          }}><span className='spanClass'>/contact</span></li>
          <li >
            <Link href='/blog'><span className='spanClass'>/blog</span></Link>
          </li>
          <li><span className='spanClass'>/projects</span></li>
        </ul>
        </nav>
        <main>
          <h1>mkaraca:$<span className='cursor'> |</span></h1>
          <ul>
          <li>
              <a href="https://www.linkedin.com/in/mkaraca25" target='_blank'>Linkedin</a>
            </li>
            <li>
              <a href="https://github.com/mkaraca25" target='_blank'>Github</a>
            </li>
            <li>
              <a href="https://wa.me/905395079658" target='_blank'>Whatsapp</a>
            </li>
            
            <li>
              <a href="https://www.instagram.com/cengmkaraca/" target='_blank'>Instagram</a>
            </li>
          </ul>
        </main>
      </div>
      <div className='hidden'>
        <div id='about-content'>
          <h2>about-me:$<span className='cursor'> |</span></h2>
          <p style={{color:'aqua'}}>
            Selam, ben Melik KARACA ve yeni mezun yazılım geliştiriciyim.
          </p>
          <p style={{color:'aqua'}}>
            Java,C#,.Net,JavaScript ve modern frameworkler ile yazılım geliştiriyorum.
          </p>
        </div>
        <div id='contact-content'>
        <h2>contact-me:$<span className='cursor'> |</span></h2>
        <p>
          Aşağıdaki mail,whatsapp veya sosyal medya hesaplarımdan ulaşabilirsiniz.
        </p>
        <ul>
          <li style={{color:'aqua'}}>Email: melikkrc25@gmail.com</li>
          <li style={{color:'aqua'}}>Whatsapp: +905395079658</li>
        </ul>
        </div>
      </div>
    </div>
  )
}

export default Home