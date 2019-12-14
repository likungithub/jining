import org.apache.logging.log4j.core.util.Assert;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.config.IniSecurityManagerFactory;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.Factory;
import org.junit.Test;

/**
 * Created by fanxi on 2016-4-25.
 */
public class LoginLogoutTest {

	@Test
	public void testLogin() {
		Factory<org.apache.shiro.mgt.SecurityManager> factory = new IniSecurityManagerFactory("classpath:shiro.ini");
		org.apache.shiro.mgt.SecurityManager securityManager = factory.getInstance();
		SecurityUtils.setSecurityManager(securityManager);
		Subject subject = SecurityUtils.getSubject();
		UsernamePasswordToken token = new UsernamePasswordToken("zhang", "123");

		try {
			subject.login(token);
		}
		catch (AuthenticationException e){

		}

		org.junit.Assert.assertEquals(true,subject.isAuthenticated());

		subject.logout();
	}
}
